export interface User {
  id: string
  username: string
  email: string
  password: string
  createdAt: string
  level: number
}

export interface Habit {
  id: string
  userId: string
  name: string
  description: string
  icon: string
  color: string
  createdAt: string
}

export interface CheckIn {
  id: string
  habitId: string
  userId: string
  date: string
  timestamp: string
}

export interface Harvest {
  name: string
  emoji: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  points: number
}

// 当前正在培养的项目
export interface ActiveProject {
  id: string
  rewardItemId: string
  seriesName: string
  userId: string
  startedAt: string
  currentCheckIns: number // 当前打卡次数
  requiredCheckIns: number // 需要的打卡次数
  isCompleted: boolean
  harvest?: Harvest
}

// 收集到的徽章
export interface Badge {
  id: string
  name: string
  emoji: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  series: string
  unlockedAt: string
}

// 用户仓库
export interface UserInventory {
  badges: Badge[]
  completedSeries: string[] // 已完成的系列
}

export interface Report {
  id: string
  userId: string
  type: 'weekly' | 'monthly' | 'yearly'
  startDate: string
  endDate: string
  generatedAt: string
  totalCheckIns: number
  successRate: number
  longestStreak: number
  currentStreak: number
  totalPoints: number
  badgesCollected: number
  isRead: boolean
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'reward'
}

export interface DailyStats {
  date: string
  checkIns: number
}

// 庆祝弹窗数据
export interface CelebrationData {
  badge: Badge
  isSeriesComplete: boolean
  seriesName: string
}
