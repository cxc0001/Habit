import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 模拟后端API服务
// 由于这是一个前端项目，我们创建一个兼容axios的模拟API来替代真实后端

// 在浏览器环境中模拟数据存储
const mockDB = {
  users: [],
  habits: {},
  checkins: {},
  reports: {},
  farms: {},
  inventories: {}
};

// 初始化一些默认用户
if (!localStorage.getItem('mock_users')) {
  const defaultUser = {
    id: 'user_1',
    username: 'demo',
    password: 'demo123',
    createdAt: new Date().toISOString(),
    level: 1
  };
  mockDB.users = [defaultUser];
  localStorage.setItem('mock_users', JSON.stringify(mockDB.users));
} else {
  mockDB.users = JSON.parse(localStorage.getItem('mock_users'));
}

// 工具函数
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API模拟
export const mockAPI = {
  // 认证相关
  login: async (username: string, password: string) => {
    await delay(500); // 模拟网络延迟
    
    const user = mockDB.users.find((u: any) => u.username === username && u.password === password);
    
    if (user) {
      // 生成模拟token
      const accessToken = btoa(`${username}:${Date.now()}`);
      const refreshToken = btoa(`${username}:refresh:${Date.now()}`);
      
      // 更新本地存储
      localStorage.setItem('mock_users', JSON.stringify(mockDB.users));
      
      return {
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            username: user.username,
            level: user.level,
            createdAt: user.createdAt
          }
        }
      };
    }
    
    throw new Error('用户名或密码错误');
  },

  register: async (username: string, password: string) => {
    await delay(500); // 模拟网络延迟
    
    // 检查用户名是否已存在
    if (mockDB.users.some((u: any) => u.username === username)) {
      throw new Error('用户名已存在');
    }
    
    // 创建新用户
    const newUser = {
      id: generateId(),
      username,
      password,
      createdAt: new Date().toISOString(),
      level: 1
    };
    
    mockDB.users.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(mockDB.users));
    
    // 生成模拟token
    const accessToken = btoa(`${username}:${Date.now()}`);
    const refreshToken = btoa(`${username}:refresh:${Date.now()}`);
    
    return {
      data: {
        accessToken,
        refreshToken,
        user: {
          id: newUser.id,
          username: newUser.username,
          level: newUser.level,
          createdAt: newUser.createdAt
        }
      }
    };
  },

  getUserProfile: async (token: string) => {
    await delay(300); // 模拟网络延迟
    
    // 这里简单地从token中解析用户名（实际应用中应验证JWT）
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return {
          data: {
            user: {
              id: user.id,
              username: user.username,
              level: user.level,
              createdAt: user.createdAt
            }
          }
        };
      }
    } catch (e) {
      console.error('Token decode error:', e);
    }
    
    throw new Error('无效的认证令牌');
  },

  // 习惯相关
  getHabits: async (userId: string) => {
    await delay(300);
    const userHabits = mockDB.habits[userId] || [];
    return { data: userHabits };
  },

  createHabit: async (userId: string, habit: any) => {
    await delay(400);
    
    if (!mockDB.habits[userId]) {
      mockDB.habits[userId] = [];
    }
    
    const newHabit = {
      ...habit,
      id: generateId(),
      userId,
      createdAt: new Date().toISOString()
    };
    
    mockDB.habits[userId].push(newHabit);
    localStorage.setItem('mock_habits', JSON.stringify(mockDB.habits));
    
    return { data: newHabit };
  },

  updateHabit: async (userId: string, habitId: string, habitData: any) => {
    await delay(400);
    
    const userHabits = mockDB.habits[userId] || [];
    const habitIndex = userHabits.findIndex((h: any) => h.id === habitId);
    
    if (habitIndex !== -1) {
      userHabits[habitIndex] = { ...userHabits[habitIndex], ...habitData };
      localStorage.setItem('mock_habits', JSON.stringify(mockDB.habits));
      
      return { data: userHabits[habitIndex] };
    }
    
    throw new Error('习惯不存在');
  },

  deleteHabit: async (userId: string, habitId: string) => {
    await delay(400);
    
    const userHabits = mockDB.habits[userId] || [];
    const habitIndex = userHabits.findIndex((h: any) => h.id === habitId);
    
    if (habitIndex !== -1) {
      userHabits.splice(habitIndex, 1);
      localStorage.setItem('mock_habits', JSON.stringify(mockDB.habits));
      
      // 同时删除相关的打卡记录
      if (mockDB.checkins[userId]) {
        mockDB.checkins[userId] = mockDB.checkins[userId].filter((c: any) => c.habitId !== habitId);
        localStorage.setItem('mock_checkins', JSON.stringify(mockDB.checkins));
      }
      
      return {};
    }
    
    throw new Error('习惯不存在');
  },

  // 打卡相关
  getCheckIns: async (userId: string) => {
    await delay(300);
    const userCheckIns = mockDB.checkins[userId] || [];
    return { data: userCheckIns };
  },

  createCheckIn: async (userId: string, habitId: string) => {
    await delay(400);
    
    if (!mockDB.checkins[userId]) {
      mockDB.checkins[userId] = [];
    }
    
    // 检查今天是否已经打过卡
    const today = new Date().toISOString().split('T')[0];
    const existingCheckIn = mockDB.checkins[userId].find((c: any) =>
      c.habitId === habitId && c.date === today
    );
    
    if (existingCheckIn) {
      throw new Error('今日已完成打卡');
    }
    
    const newCheckIn = {
      id: generateId(),
      habitId,
      userId,
      date: today,
      timestamp: new Date().toISOString()
    };
    
    mockDB.checkins[userId].push(newCheckIn);
    localStorage.setItem('mock_checkins', JSON.stringify(mockDB.checkins));
    
    return { data: newCheckIn };
  },

  deleteCheckIn: async (userId: string, checkInId: string) => {
    await delay(400);
    
    const userCheckIns = mockDB.checkins[userId] || [];
    const checkInIndex = userCheckIns.findIndex((c: any) => c.id === checkInId);
    
    if (checkInIndex !== -1) {
      userCheckIns.splice(checkInIndex, 1);
      localStorage.setItem('mock_checkins', JSON.stringify(mockDB.checkins));
      
      return {};
    }
    
    throw new Error('打卡记录不存在');
  },

  // 报告相关
  getReports: async (userId: string) => {
    await delay(300);
    const userReports = mockDB.reports[userId] || [];
    return { data: userReports };
  },

  generateReport: async (userId: string, reportData: any) => {
    await delay(500);
    
    if (!mockDB.reports[userId]) {
      mockDB.reports[userId] = [];
    }
    
    const newReport = {
      id: generateId(),
      userId,
      ...reportData,
      generatedAt: new Date().toISOString(),
      isRead: false
    };
    
    mockDB.reports[userId].push(newReport);
    localStorage.setItem('mock_reports', JSON.stringify(mockDB.reports));
    
    return { data: newReport };
  },

  markReportAsRead: async (userId: string, reportId: string) => {
    await delay(300);
    
    const userReports = mockDB.reports[userId] || [];
    const report = userReports.find((r: any) => r.id === reportId);
    
    if (report) {
      report.isRead = true;
      localStorage.setItem('mock_reports', JSON.stringify(mockDB.reports));
      
      return {};
    }
    
    throw new Error('报告不存在');
  },

  // 农场相关
  getFarmData: async (userId: string) => {
    await delay(300);
    
    if (!mockDB.farms[userId]) {
      mockDB.farms[userId] = {
        activeProjects: [],
        harvests: []
      };
    }
    
    return { data: mockDB.farms[userId] };
  },

  startGrowing: async (userId: string, rewardItemId: string) => {
    await delay(400);
    
    if (!mockDB.farms[userId]) {
      mockDB.farms[userId] = {
        activeProjects: [],
        harvests: []
      };
    }
    
    // 这里只是模拟开始培养过程
    const newProject = {
      id: generateId(),
      rewardItemId,
      userId,
      startedAt: new Date().toISOString(),
      currentCheckIns: 0,
      requiredCheckIns: 10, // 示例值
      isCompleted: false
    };
    
    mockDB.farms[userId].activeProjects.push(newProject);
    localStorage.setItem('mock_farms', JSON.stringify(mockDB.farms));
    
    return { data: newProject };
  },

  completeGrowth: async (userId: string, projectId: string) => {
    await delay(400);
    
    if (!mockDB.farms[userId]) {
      throw new Error('农场数据不存在');
    }
    
    const project = mockDB.farms[userId].activeProjects.find((p: any) => p.id === projectId);
    if (project) {
      project.isCompleted = true;
      
      // 添加收获到收获列表
      if (!mockDB.farms[userId].harvests) {
        mockDB.farms[userId].harvests = [];
      }
      
      // 这里简单模拟一个收获
      const harvest = {
        id: generateId(),
        projectId,
        name: `收获-${project.rewardItemId}`,
        emoji: '🌱',
        obtainedAt: new Date().toISOString()
      };
      
      mockDB.farms[userId].harvests.push(harvest);
      localStorage.setItem('mock_farms', JSON.stringify(mockDB.farms));
      
      return { data: harvest };
    }
    
    throw new Error('培养项目不存在');
  },

  getUserInventory: async (userId: string) => {
    await delay(300);
    
    if (!mockDB.inventories[userId]) {
      mockDB.inventories[userId] = {
        badges: [],
        completedSeries: []
      };
    }
    
    return { data: mockDB.inventories[userId] };
  }
};

// 创建一个兼容axios的模拟API客户端
export const createMockAPIAdapter = (): AxiosInstance => {
  const adapter: AxiosInstance = {
    // 拦截器
    interceptors: {
      request: {
        use: () => {},
        eject: () => {},
        clear: () => {}
      },
      response: {
        use: () => {},
        eject: () => {},
        clear: () => {}
      }
    },
    
    // GET请求
    get: async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return Promise.reject({ response: { status: 401, data: { message: '未授权访问' } } });
      }
      
      try {
        switch(url) {
          case '/auth/profile':
            return await mockAPI.getUserProfile(token);
          case '/habits':
            // 从存储的用户信息中获取userId
            const userStr = localStorage.getItem('user');
            if (userStr) {
              const user = JSON.parse(userStr);
              return await mockAPI.getHabits(user.id);
            }
            break;
          case '/checkins':
            const userStr2 = localStorage.getItem('user');
            if (userStr2) {
              const user = JSON.parse(userStr2);
              return await mockAPI.getCheckIns(user.id);
            }
            break;
          case '/reports':
            const userStr3 = localStorage.getItem('user');
            if (userStr3) {
              const user = JSON.parse(userStr3);
              return await mockAPI.getReports(user.id);
            }
            break;
          case '/farm':
            const userStr4 = localStorage.getItem('user');
            if (userStr4) {
              const user = JSON.parse(userStr4);
              return await mockAPI.getFarmData(user.id);
            }
            break;
          case '/inventory':
            const userStr5 = localStorage.getItem('user');
            if (userStr5) {
              const user = JSON.parse(userStr5);
              return await mockAPI.getUserInventory(user.id);
            }
            break;
        }
        
        // 如果没有匹配的路由，抛出错误
        throw new Error('接口不存在');
      } catch (error: any) {
        return Promise.reject({ response: { status: 404, data: { message: error.message } } });
      }
    },
    
    // POST请求
    post: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      try {
        switch(url) {
          case '/auth/login':
            return await mockAPI.login(data.username, data.password);
          case '/auth/register':
            return await mockAPI.register(data.username, data.password);
          case '/habits':
            const userStr = localStorage.getItem('user');
            if (userStr) {
              const user = JSON.parse(userStr);
              return await mockAPI.createHabit(user.id, data);
            }
            break;
          case '/checkins':
            const userStr2 = localStorage.getItem('user');
            if (userStr2) {
              const user = JSON.parse(userStr2);
              return await mockAPI.createCheckIn(user.id, data.habitId);
            }
            break;
          case '/reports':
            const userStr3 = localStorage.getItem('user');
            if (userStr3) {
              const user = JSON.parse(userStr3);
              return await mockAPI.generateReport(user.id, data);
            }
            break;
          case '/farm/grow':
            const userStr4 = localStorage.getItem('user');
            if (userStr4) {
              const user = JSON.parse(userStr4);
              return await mockAPI.startGrowing(user.id, data.rewardItemId);
            }
            break;
          case '/auth/refresh':
            // 模拟刷新token
            return { data: { accessToken: btoa(`refreshed:${Date.now()}`) } };
        }
        
        throw new Error('接口不存在');
      } catch (error: any) {
        return Promise.reject({ response: { status: 404, data: { message: error.message } } });
      }
    },
    
    // PUT请求
    put: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      const urlParts = url.split('/');
      const habitId = urlParts[urlParts.length - 1];
      const userStr = localStorage.getItem('user');
      
      if (userStr && habitId && habitId !== 'habits') {
        const user = JSON.parse(userStr);
        try {
          return await mockAPI.updateHabit(user.id, habitId, data);
        } catch (error: any) {
          return Promise.reject({ response: { status: 404, data: { message: error.message } } });
        }
      }
      
      return Promise.reject({ response: { status: 404, data: { message: '接口不存在' } } });
    },
    
    // DELETE请求
    delete: async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 1];
      
      if (url.startsWith('/habits/')) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          try {
            return await mockAPI.deleteHabit(user.id, id);
          } catch (error: any) {
            return Promise.reject({ response: { status: 404, data: { message: error.message } } });
          }
        }
      } else if (url.startsWith('/checkins/')) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          try {
            return await mockAPI.deleteCheckIn(user.id, id);
          } catch (error: any) {
            return Promise.reject({ response: { status: 404, data: { message: error.message } } });
          }
        }
      }
      
      return Promise.reject({ response: { status: 404, data: { message: '接口不存在' } } });
    },
    
    // PATCH请求
    patch: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
      if (url.includes('/reports/') && url.endsWith('/read')) {
        const parts = url.split('/');
        const reportId = parts[parts.length - 2];
        const userStr = localStorage.getItem('user');
        
        if (userStr) {
          const user = JSON.parse(userStr);
          try {
            return await mockAPI.markReportAsRead(user.id, reportId);
          } catch (error: any) {
            return Promise.reject({ response: { status: 404, data: { message: error.message } } });
          }
        }
      }
      
      return Promise.reject({ response: { status: 404, data: { message: '接口不存在' } } });
    },
    
    // 其他必需的axios方法
    request: async (config: AxiosRequestConfig) => {
      switch(config.method?.toLowerCase()) {
        case 'get':
          return adapter.get!(config.url!, config);
        case 'post':
          return adapter.post!(config.url!, config.data, config);
        case 'put':
          return adapter.put!(config.url!, config.data, config);
        case 'delete':
          return adapter.delete!(config.url!, config);
        case 'patch':
          return adapter.patch!(config.url!, config.data, config);
        default:
          throw new Error(`Method ${config.method} not supported`);
      }
    },
    
    getUri: (config?: AxiosRequestConfig) => '',
    head: async (url: string, config?: AxiosRequestConfig) => ({ data: {} }),
    options: async (url: string, config?: AxiosRequestConfig) => ({ data: {} }),
    postForm: async (url: string, data?: any, config?: AxiosRequestConfig) => ({ data: {} }),
    putForm: async (url: string, data?: any, config?: AxiosRequestConfig) => ({ data: {} }),
    patchForm: async (url: string, data?: any, config?: AxiosRequestConfig) => ({ data: {} }),
    
    defaults: {
      headers: {
        common: {},
        delete: {},
        get: {},
        head: {},
        post: {},
        put: {},
        patch: {},
        options: {},
        purge: {},
        link: {},
        unlink: {}
      }
    }
  };
  
  return adapter;
};