import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'
import { authAPI } from '@/services/api'

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

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 检查并自动刷新token
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (accessToken && refreshToken) {
        try {
          // 验证token是否有效
          const response = await authAPI.getUserProfile();
          if (response.data && (response.data as ProfileResponse).user) {
            setUser((response.data as ProfileResponse).user);
          } else {
            // Token无效，清除本地存储
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token验证失败:', error);
          // Token无效，清除本地存储
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.login(username, password);
      const data = response.data as LoginResponse;
      
      if (data && data.accessToken && data.refreshToken) {
        // 存储tokens，refresh token设置30天过期
        localStorage.setItem('access_token', data.accessToken);
        
        // 设置refresh token，有效期30天
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);
        localStorage.setItem('refresh_token', data.refreshToken);
        
        // 存储用户信息
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return { success: true };
      }
      
      return { success: false, message: '登录失败，请检查用户名和密码' };
    } catch (error: any) {
      console.error('Login error:', error);
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
        
        // 设置refresh token，有效期30天
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);
        localStorage.setItem('refresh_token', data.refreshToken);
        
        // 存储用户信息
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return { success: true };
      }
      
      return { success: false, message: '注册失败' };
    } catch (error: any) {
      console.error('Register error:', error);
      let message = '注册失败';
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      return { success: false, message };
    }
  }

  const logout = () => {
    // 清除所有认证相关的本地存储
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  }

  const refreshUser = async () => {
    try {
      const response = await authAPI.getUserProfile();
      const data = response.data as ProfileResponse;
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('刷新用户信息失败:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshUser }}>
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
