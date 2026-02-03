require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Secret keys
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret-key-here';

// 文件存储配置
const DATA_DIR = process.env.DATA_DIR || './data';
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const HABITS_FILE = path.join(DATA_DIR, 'habits.json');
const CHECKINS_FILE = path.join(DATA_DIR, 'checkins.json');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');
const FARMS_FILE = path.join(DATA_DIR, 'farms.json');
const INVENTORIES_FILE = path.join(DATA_DIR, 'inventories.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 数据存储对象
let users = [];
let habits = {};
let checkins = {};
let reports = {};
let farms = {};
let inventories = {};

// 文件存储操作函数
function loadDataFromFile() {
  try {
    // 加载用户数据
    if (fs.existsSync(USERS_FILE)) {
      const usersData = fs.readFileSync(USERS_FILE, 'utf8');
      users = JSON.parse(usersData);
      console.log(`已加载 ${users.length} 个用户数据`);
    } else {
      users = [];
      saveDataToFile('users');
    }

    // 加载习惯数据
    if (fs.existsSync(HABITS_FILE)) {
      const habitsData = fs.readFileSync(HABITS_FILE, 'utf8');
      habits = JSON.parse(habitsData);
    } else {
      habits = {};
      saveDataToFile('habits');
    }

    // 加载打卡数据
    if (fs.existsSync(CHECKINS_FILE)) {
      const checkinsData = fs.readFileSync(CHECKINS_FILE, 'utf8');
      checkins = JSON.parse(checkinsData);
    } else {
      checkins = {};
      saveDataToFile('checkins');
    }

    // 加载报告数据
    if (fs.existsSync(REPORTS_FILE)) {
      const reportsData = fs.readFileSync(REPORTS_FILE, 'utf8');
      reports = JSON.parse(reportsData);
    } else {
      reports = {};
      saveDataToFile('reports');
    }

    // 加载农场数据
    if (fs.existsSync(FARMS_FILE)) {
      const farmsData = fs.readFileSync(FARMS_FILE, 'utf8');
      farms = JSON.parse(farmsData);
    } else {
      farms = {};
      saveDataToFile('farms');
    }

    // 加载库存数据
    if (fs.existsSync(INVENTORIES_FILE)) {
      const inventoriesData = fs.readFileSync(INVENTORIES_FILE, 'utf8');
      inventories = JSON.parse(inventoriesData);
    } else {
      inventories = {};
      saveDataToFile('inventories');
    }

    console.log('所有数据文件加载完成');
  } catch (error) {
    console.error('加载数据文件失败:', error);
    // 如果文件损坏，使用空数据
    initializeDefaultData();
  }
}

function saveDataToFile(dataType) {
  try {
    switch (dataType) {
      case 'users':
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        break;
      case 'habits':
        fs.writeFileSync(HABITS_FILE, JSON.stringify(habits, null, 2));
        break;
      case 'checkins':
        fs.writeFileSync(CHECKINS_FILE, JSON.stringify(checkins, null, 2));
        break;
      case 'reports':
        fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
        break;
      case 'farms':
        fs.writeFileSync(FARMS_FILE, JSON.stringify(farms, null, 2));
        break;
      case 'inventories':
        fs.writeFileSync(INVENTORIES_FILE, JSON.stringify(inventories, null, 2));
        break;
      case 'all':
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        fs.writeFileSync(HABITS_FILE, JSON.stringify(habits, null, 2));
        fs.writeFileSync(CHECKINS_FILE, JSON.stringify(checkins, null, 2));
        fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
        fs.writeFileSync(FARMS_FILE, JSON.stringify(farms, null, 2));
        fs.writeFileSync(INVENTORIES_FILE, JSON.stringify(inventories, null, 2));
        console.log('所有数据已保存到文件');
        break;
    }
  } catch (error) {
    console.error(`保存${dataType}数据失败:`, error);
  }
}

function initializeDefaultData() {
  users = [];
  habits = {};
  checkins = {};
  reports = {};
  farms = {};
  inventories = {};

  // 创建演示用户
  const hashedPassword = bcrypt.hashSync('demo123', 10);
  const demoUser = {
    id: 'user_1',
    username: 'demo',
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    level: 1
  };
  
  users.push(demoUser);
  
  // 初始化演示用户的数据结构
  habits[demoUser.id] = [];
  checkins[demoUser.id] = [];
  reports[demoUser.id] = [];
  farms[demoUser.id] = {
    activeProjects: [],
    harvests: []
  };
  inventories[demoUser.id] = {
    badges: [],
    completedSeries: []
  };

  // 保存所有数据
  saveDataToFile('all');
  console.log('默认数据初始化完成');
}

// 启动时加载数据
loadDataFromFile();

// 设置定时自动保存（每5分钟保存一次）
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000; // 5分钟
setInterval(() => {
  saveDataToFile('all');
}, AUTO_SAVE_INTERVAL);

// 优雅退出时保存数据
process.on('SIGINT', () => {
  console.log('收到退出信号，正在保存数据...');
  saveDataToFile('all');
  console.log('数据保存完成，退出进程');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('收到终止信号，正在保存数据...');
  saveDataToFile('all');
  console.log('数据保存完成，退出进程');
  process.exit(0);
});

// Helper functions
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    REFRESH_SECRET,
    { expiresIn: '30d' }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// 数据操作辅助函数
function saveUserData(userId) {
  // 确保所有用户相关数据都已初始化
  if (!habits[userId]) habits[userId] = [];
  if (!checkins[userId]) checkins[userId] = [];
  if (!reports[userId]) reports[userId] = [];
  if (!farms[userId]) {
    farms[userId] = {
      activeProjects: [],
      harvests: []
    };
  }
  if (!inventories[userId]) {
    inventories[userId] = {
      badges: [],
      completedSeries: []
    };
  }
  
  // 保存所有相关数据
  saveDataToFile('habits');
  saveDataToFile('checkins');
  saveDataToFile('reports');
  saveDataToFile('farms');
  saveDataToFile('inventories');
}

// Routes

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Prepare user response
    const userResponse = {
      id: user.id,
      username: user.username,
      level: user.level,
      createdAt: user.createdAt
    };

    res.json({
      accessToken,
      refreshToken,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: '密码长度至少为6位' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      level: 1
    };

    users.push(newUser);
    saveDataToFile('users');

    // Initialize user data structures
    habits[newUser.id] = [];
    checkins[newUser.id] = [];
    reports[newUser.id] = [];
    farms[newUser.id] = {
      activeProjects: [],
      harvests: []
    };
    inventories[newUser.id] = {
      badges: [],
      completedSeries: []
    };
    
    saveUserData(newUser.id);

    // Generate tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Prepare user response
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      level: newUser.level,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      accessToken,
      refreshToken,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.get('/api/auth/profile', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        level: user.level,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.post('/api/auth/refresh', (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    jwt.verify(refresh_token, REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
      }

      // Find user
      const dbUser = users.find(u => u.id === user.userId);
      if (!dbUser) {
        return res.status(403).json({ message: 'User not found' });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(dbUser);

      res.json({
        accessToken: newAccessToken
      });
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// Habits routes
app.get('/api/habits', authenticateToken, (req, res) => {
  try {
    const userHabits = habits[req.user.userId] || [];
    res.json(userHabits);
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.post('/api/habits', authenticateToken, (req, res) => {
  try {
    const { name, description, icon, color } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ message: '名称和图标是必需的' });
    }

    const newHabit = {
      id: uuidv4(),
      userId: req.user.userId,
      name,
      description: description || '',
      icon,
      color: color || '#6366f1',
      createdAt: new Date().toISOString()
    };

    if (!habits[req.user.userId]) {
      habits[req.user.userId] = [];
    }

    habits[req.user.userId].push(newHabit);
    saveDataToFile('habits');

    res.status(201).json(newHabit);
  } catch (error) {
    console.error('Create habit error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.put('/api/habits/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color } = req.body;

    const userHabits = habits[req.user.userId] || [];
    const habitIndex = userHabits.findIndex(h => h.id === id);

    if (habitIndex === -1) {
      return res.status(404).json({ message: '习惯不存在' });
    }

    userHabits[habitIndex] = {
      ...userHabits[habitIndex],
      name: name || userHabits[habitIndex].name,
      description: description || userHabits[habitIndex].description,
      icon: icon || userHabits[habitIndex].icon,
      color: color || userHabits[habitIndex].color
    };

    saveDataToFile('habits');
    res.json(userHabits[habitIndex]);
  } catch (error) {
    console.error('Update habit error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.delete('/api/habits/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    const userHabits = habits[req.user.userId] || [];
    const habitIndex = userHabits.findIndex(h => h.id === id);

    if (habitIndex === -1) {
      return res.status(404).json({ message: '习惯不存在' });
    }

    // Remove habit
    const deletedHabit = userHabits.splice(habitIndex, 1)[0];

    // Also remove associated check-ins
    if (checkins[req.user.userId]) {
      checkins[req.user.userId] = checkins[req.user.userId].filter(c => c.habitId !== id);
      saveDataToFile('checkins');
    }

    saveDataToFile('habits');
    res.json({ message: '习惯删除成功' });
  } catch (error) {
    console.error('Delete habit error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// Check-ins routes
app.get('/api/checkins', authenticateToken, (req, res) => {
  try {
    const userCheckins = checkins[req.user.userId] || [];
    res.json(userCheckins);
  } catch (error) {
    console.error('Get checkins error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.post('/api/checkins', authenticateToken, (req, res) => {
  try {
    const { habitId } = req.body;

    // Verify habit belongs to user
    const userHabits = habits[req.user.userId] || [];
    const habit = userHabits.find(h => h.id === habitId);
    if (!habit) {
      return res.status(404).json({ message: '习惯不存在' });
    }

    // Check if already checked in today
    const today = new Date().toISOString().split('T')[0];
    const existingCheckin = (checkins[req.user.userId] || []).find(
      c => c.habitId === habitId && c.date === today
    );

    if (existingCheckin) {
      return res.status(400).json({ message: '今日已完成打卡' });
    }

    const newCheckin = {
      id: uuidv4(),
      habitId,
      userId: req.user.userId,
      date: today,
      timestamp: new Date().toISOString()
    };

    if (!checkins[req.user.userId]) {
      checkins[req.user.userId] = [];
    }

    checkins[req.user.userId].push(newCheckin);
    saveDataToFile('checkins');

    res.status(201).json(newCheckin);
  } catch (error) {
    console.error('Create checkin error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.delete('/api/checkins/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    const userCheckins = checkins[req.user.userId] || [];
    const checkinIndex = userCheckins.findIndex(c => c.id === id);

    if (checkinIndex === -1) {
      return res.status(404).json({ message: '打卡记录不存在' });
    }

    userCheckins.splice(checkinIndex, 1);
    saveDataToFile('checkins');

    res.json({ message: '打卡记录删除成功' });
  } catch (error) {
    console.error('Delete checkin error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// Reports routes
app.get('/api/reports', authenticateToken, (req, res) => {
  try {
    const userReports = reports[req.user.userId] || [];
    res.json(userReports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.post('/api/reports', authenticateToken, (req, res) => {
  try {
    const reportData = req.body;

    const newReport = {
      id: uuidv4(),
      userId: req.user.userId,
      ...reportData,
      generatedAt: new Date().toISOString(),
      isRead: false
    };

    if (!reports[req.user.userId]) {
      reports[req.user.userId] = [];
    }

    reports[req.user.userId].push(newReport);
    saveDataToFile('reports');

    res.status(201).json(newReport);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.patch('/api/reports/:id/read', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    const userReports = reports[req.user.userId] || [];
    const report = userReports.find(r => r.id === id);

    if (!report) {
      return res.status(404).json({ message: '报告不存在' });
    }

    report.isRead = true;
    saveDataToFile('reports');

    res.json({ message: '报告标记为已读' });
  } catch (error) {
    console.error('Mark report as read error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// Farm routes
app.get('/api/farm', authenticateToken, (req, res) => {
  try {
    const userData = farms[req.user.userId];
    if (!userData) {
      return res.status(404).json({ message: '农场数据不存在' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Get farm data error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.post('/api/farm/grow', authenticateToken, (req, res) => {
  try {
    const { rewardItemId } = req.body;

    const newProject = {
      id: uuidv4(),
      rewardItemId,
      userId: req.user.userId,
      startedAt: new Date().toISOString(),
      currentCheckIns: 0,
      requiredCheckIns: 10,
      isCompleted: false
    };

    if (!farms[req.user.userId]) {
      farms[req.user.userId] = {
        activeProjects: [],
        harvests: []
      };
    }

    farms[req.user.userId].activeProjects.push(newProject);
    saveDataToFile('farms');

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Start growing error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

app.post('/api/farm/complete/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    const userData = farms[req.user.userId];
    if (!userData) {
      return res.status(404).json({ message: '农场数据不存在' });
    }

    const project = userData.activeProjects.find(p => p.id === id);
    if (!project) {
      return res.status(404).json({ message: '培养项目不存在' });
    }

    // Mark as completed
    project.isCompleted = true;

    // Add to harvests
    const harvest = {
      id: uuidv4(),
      projectId: project.id,
      name: `收获-${project.rewardItemId}`,
      emoji: '🌱',
      obtainedAt: new Date().toISOString()
    };

    userData.harvests.push(harvest);
    saveDataToFile('farms');

    res.json(harvest);
  } catch (error) {
    console.error('Complete growth error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// Inventory routes
app.get('/api/inventory', authenticateToken, (req, res) => {
  try {
    const userData = inventories[req.user.userId];
    if (!userData) {
      return res.status(404).json({ message: '用户库存不存在' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 数据管理API（仅用于开发和维护）
app.get('/api/admin/backup', authenticateToken, (req, res) => {
  try {
    // 简单的权限检查（实际生产环境中应该有更严格的权限控制）
    if (req.user.username !== 'demo') {
      return res.status(403).json({ message: '权限不足' });
    }
    
    saveDataToFile('all');
    res.json({ message: '数据备份完成', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Backup error:', error);
    res.status(500).json({ message: '备份失败' });
  }
});

app.get('/api/admin/stats', authenticateToken, (req, res) => {
  try {
    if (req.user.username !== 'demo') {
      return res.status(403).json({ message: '权限不足' });
    }
    
    const stats = {
      users: users.length,
      habits: Object.keys(habits).reduce((sum, userId) => sum + habits[userId].length, 0),
      checkins: Object.keys(checkins).reduce((sum, userId) => sum + checkins[userId].length, 0),
      reports: Object.keys(reports).reduce((sum, userId) => sum + reports[userId].length, 0),
      farms: Object.keys(farms).length,
      inventories: Object.keys(inventories).length,
      timestamp: new Date().toISOString()
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: '获取统计信息失败' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  const dataDirExists = fs.existsSync(DATA_DIR);
  const files = {
    users: fs.existsSync(USERS_FILE),
    habits: fs.existsSync(HABITS_FILE),
    checkins: fs.existsSync(CHECKINS_FILE),
    reports: fs.existsSync(REPORTS_FILE),
    farms: fs.existsSync(FARMS_FILE),
    inventories: fs.existsSync(INVENTORIES_FILE)
  };
  
  res.json({
    status: 'OK',
    dataDir: dataDirExists ? 'exists' : 'missing',
    files,
    timestamp: new Date().toISOString()
  });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
  console.log(`Data directory: ${DATA_DIR}`);
  console.log(`Auto-save interval: ${AUTO_SAVE_INTERVAL / 60000} minutes`);
});