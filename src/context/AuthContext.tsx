import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react'
import { User } from '@/types'
import { authAPI } from '@/services/api'
import axios from 'axios'

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface ProfileResponse {
  user: User;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string; // 新增：后端会返回新的refresh_token
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
  refreshTokens: () => Promise<boolean> // 新增：手动刷新token的方法
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Token刷新队列管理
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// 刷新token的函数（会被多次调用）
const refreshTokens = async (): Promise<{
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
}> => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    return { success: false };
  }

  try {
    const response = await axios.post<RefreshResponse>('/api/auth/refresh', {
      refresh_token: refreshToken
    });
    
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    // 保存新的tokens
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', newRefreshToken); // 更新refresh_token实现滚动过期
    
    // 更新axios默认header
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    console.log('Tokens刷新成功');
    return { 
      success: true, 
      accessToken, 
      refreshToken: newRefreshToken 
    };
  } catch (error: any) {
    console.error('刷新tokens失败:', error);
    return { success: false };
  }
};

// 设置axios拦截器
const setupAxiosInterceptors = () => {
  // 请求拦截器
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器 - 处理token过期
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      // 如果是401错误且不是刷新token或登录/注册请求
      if (error.response?.status === 401 && !originalRequest._retry) {
        // 排除认证相关的API
        if (originalRequest.url.includes('/auth/login') || 
            originalRequest.url.includes('/auth/register') ||
            originalRequest.url.includes('/auth/refresh')) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // 如果已经在刷新token，将请求加入队列
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // 调用刷新token接口
          const refreshResult = await refreshTokens();
          
          if (refreshResult.success && refreshResult.accessToken) {
            // 处理队列中的请求
            processQueue(null, refreshResult.accessToken);
            
            // 重试原始请求
            originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
            return axios(originalRequest);
          } else {
            // 刷新失败，清除认证信息
            processQueue(new Error('刷新token失败'), null);
            logoutUser();
            return Promise.reject(error);
          }
        } catch (refreshError: any) {
          // 刷新token失败
          processQueue(refreshError, null);
          logoutUser();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

// 辅助函数：清除用户数据并重定向
const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  
  // 延迟重定向以避免在组件渲染中重定向
  setTimeout(() => {
    window.location.href = '/login';
  }, 100);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 清除刷新定时器
  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, [])

  // 定时刷新token（每14分钟一次，在access_token过期前）
  const setupTokenRefresh = useCallback(() => {
    clearRefreshTimer();
    
    // 只有在有refresh_token时才设置定时器
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return;

    // 每14分钟刷新一次token（access_token有效期为15分钟）
    refreshTimerRef.current = setInterval(async () => {
      try {
        await refreshTokens();
        console.log('定时刷新tokens成功');
      } catch (error) {
        console.error('定时刷新tokens失败:', error);
        // 刷新失败，清除定时器
        clearRefreshTimer();
      }
    }, 14 * 60 * 1000); // 14分钟
  }, [clearRefreshTimer])

  // 手动刷新token（供外部调用）
  const manualRefreshTokens = useCallback(async (): Promise<boolean> => {
    try {
      const result = await refreshTokens();
      if (result.success) {
        console.log('手动刷新tokens成功');
        return true;
      }
      return false;
    } catch (error) {
      console.error('手动刷新tokens失败:', error);
      return false;
    }
  }, [])

  // 获取用户信息
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await authAPI.getUserProfile();
      const userData = response.data.user;
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error;
    }
  }, [])

  // 初始化认证状态
  const initializeAuth = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const storedUser = localStorage.getItem('user');

    // 如果没有token，直接结束加载
    if (!accessToken || !refreshToken) {
      if (storedUser) {
        localStorage.removeItem('user');
      }
      setIsLoading(false);
      return;
    }

    try {
      // 设置axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // 获取用户信息
      await fetchUserProfile();
      
      // 设置定时刷新token
      setupTokenRefresh();
      
      // 如果access_token快过期了（比如还剩不到5分钟），立即刷新一次
      // 这样可以避免首次API调用就遇到401
      try {
        // 尝试解码token获取过期时间（简化处理）
        // 实际上应该解析JWT，这里用简化的时间判断
        const tokenAge = Date.now() - parseInt(localStorage.getItem('token_timestamp') || '0');
        const FIVE_MINUTES = 5 * 60 * 1000;
        const FIFTEEN_MINUTES = 15 * 60 * 1000;
        
        if (tokenAge > FIFTEEN_MINUTES - FIVE_MINUTES) {
          // token可能快过期了，主动刷新一次
          await manualRefreshTokens();
        }
      } catch (e) {
        // 忽略时间判断错误
      }
      
    } catch (error: any) {
      console.error('初始化认证失败:', error);
      
      // 如果是401错误，尝试刷新token
      if (error.response?.status === 401) {
        try {
          const refreshResult = await refreshTokens();
          
          if (refreshResult.success) {
            // 重新获取用户信息
            await fetchUserProfile();
            
            // 设置定时刷新token
            setupTokenRefresh();
          } else {
            logout();
          }
        } catch (refreshError) {
          console.error('刷新token失败:', refreshError);
          logout();
        }
      } else {
        // 其他错误，清除认证信息
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfile, setupTokenRefresh, manualRefreshTokens])

  useEffect(() => {
    // 设置axios拦截器
    setupAxiosInterceptors();
    
    // 初始化认证
    initializeAuth();

    // 组件卸载时清除定时器
    return () => {
      clearRefreshTimer();
    };
  }, [initializeAuth, clearRefreshTimer])

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.login(username, password);
      const data = response.data as LoginResponse;
      
      if (data && data.accessToken && data.refreshToken) {
        // 存储tokens
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('token_timestamp', Date.now().toString()); // 记录token获取时间
        
        // 设置axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        
        // 存储用户信息
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // 设置定时刷新token
        setupTokenRefresh();
        
        return { success: true };
      }
      
      return { success: false, message: '登录失败，请检查用户名和密码' };
    } catch (error: any) {
      console.error('登录错误:', error);
      let message = '登录失败';
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      return { success: false, message };
    }
  }

  const register = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.register(username, password);
      const data = response.data as RegisterResponse;
      
      if (data && data.accessToken && data.refreshToken) {
        // 存储tokens
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('token_timestamp', Date.now().toString());
        
        // 设置axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        
        // 存储用户信息
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // 设置定时刷新token
        setupTokenRefresh();
        
        return { success: true };
      }
      
      return { success: false, message: '注册失败' };
    } catch (error: any) {
      console.error('注册错误:', error);
      let message = '注册失败';
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      return { success: false, message };
    }
  }

  const logout = useCallback(() => {
    // 清除本地存储
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_timestamp');
    
    // 清除axios header
    delete axios.defaults.headers.common['Authorization'];
    
    // 清除定时器
    clearRefreshTimer();
    
    // 清除状态
    setUser(null);
    
    // 重定向到登录页
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }, [clearRefreshTimer])

  const refreshUser = async () => {
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error('刷新用户信息失败:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      refreshUser,
      refreshTokens: manualRefreshTokens 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}