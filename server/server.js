require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Secret keys
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret-key-here';

// In-memory storage (in production, use a real database like MongoDB or PostgreSQL)
let users = [];
let habits = {};
let checkins = {};
let reports = {};
let farms = {};
let inventories = {};

// Load sample data if needed
if (users.length === 0) {
  // Hash password for demo user
  const hashedPassword = bcrypt.hashSync('demo123', 10);
  users.push({
    id: 'user_1',
    username: 'demo',
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    level: 1
  });
}

// Helper functions
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '15m' } // 15分钟访问令牌
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    REFRESH_SECRET,
    { expiresIn: '30d' } // 30天刷新令牌
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

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

    // Update user in storage
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
    }

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
      requiredCheckIns: 10, // 默认需要10次打卡
      isCompleted: false
    };

    if (!farms[req.user.userId]) {
      farms[req.user.userId] = {
        activeProjects: [],
        harvests: []
      };
    }

    farms[req.user.userId].activeProjects.push(newProject);

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
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
});