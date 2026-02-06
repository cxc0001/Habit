import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',  // 使用相对路径
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 修复类型错误
declare global {
  interface ImportMeta {
    env: Record<string, string>;
  }
}

// 请求拦截器 - 添加认证token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理token过期等
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 清除本地存储的token
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      // 重定向到登录页（如果应用中有路由管理）
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// 认证相关API
export const authAPI = {
  // 登录
  login: (username: string, password: string) => 
    apiClient.post('/auth/login', { username, password }),
  
  // 注册
  register: (username: string, password: string) => 
    apiClient.post('/auth/register', { username, password }),
  
  // 刷新token
  refreshToken: () => 
    apiClient.post('/auth/refresh', { refreshToken: localStorage.getItem('refresh_token') }),
  
  // 获取用户信息
  getUserProfile: () => 
    apiClient.get('/auth/profile'),
};

// 习惯相关API
export const habitAPI = {
  // 获取用户习惯列表
  getHabits: () => apiClient.get('/habits'),
  
  // 创建习惯
  createHabit: (habit: any) => apiClient.post('/habits', habit),
  
  // 更新习惯
  updateHabit: (id: string, habit: any) => apiClient.put(`/habits/${id}`, habit),
  
  // 删除习惯
  deleteHabit: (id: string) => apiClient.delete(`/habits/${id}`),
};

// 打卡相关API
export const checkInAPI = {
  // 获取打卡记录
  getCheckIns: () => apiClient.get('/checkins'),
  
  // 创建打卡记录
  createCheckIn: (habitId: string) => apiClient.post('/checkins', { habitId }),
  
  // 删除打卡记录
  deleteCheckIn: (id: string) => apiClient.delete(`/checkins/${id}`),
};

// 报告相关API
export const reportAPI = {
  // 获取报告
  getReports: () => apiClient.get('/reports'),
  
  // 生成报告
  generateReport: (reportData: any) => apiClient.post('/reports', reportData),
  
  // 更新报告状态为已读
  markReportAsRead: (id: string) => apiClient.patch(`/reports/${id}/read`),
};

// 农场相关API
export const farmAPI = {
  // 获取农场数据
  getFarmData: () => apiClient.get('/farm'),
  
  // 开始培养新项目
  startGrowing: (rewardItemId: string) => apiClient.post('/farm/grow', { rewardItemId }),
  
  // 完成培养
  completeGrowth: (projectId: string) => apiClient.post(`/farm/complete/${projectId}`),
  
  // 获取用户库存
  getUserInventory: () => apiClient.get('/inventory'),
};