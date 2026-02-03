export interface User {
  id: string;
  username: string;
  level: number;
  createdAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  createdAt: string;
}

export interface CheckIn {
  id: string;
  habitId: string;
  userId: string;
  date: string;
  timestamp: string;
}

export interface Report {
  id: string;
  userId: string;
  generatedAt: string;
  isRead: boolean;
  [key: string]: any; // 允许其他动态属性
}

export interface Farm {
  activeProjects: FarmProject[];
  harvests: Harvest[];
}

export interface FarmProject {
  id: string;
  rewardItemId: string;
  userId: string;
  startedAt: string;
  currentCheckIns: number;
  requiredCheckIns: number;
  isCompleted: boolean;
}

export interface Harvest {
  id: string;
  projectId: string;
  name: string;
  emoji: string;
  obtainedAt: string;
  rarity?: string;
  points?: number;
}

export interface Inventory {
  badges: any[];
  completedSeries: any[];
}

export interface DailyStats {
  date: string;
  checkIns: number;
}

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  message?: string; // 添加message字段，因为Toast组件使用了这个字段
  type: 'success' | 'error' | 'info' | 'reward';
  duration?: number;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  rarity: string;
  unlocked: boolean;
  checkInsRequired: number;
  series?: string;
  unlockedAt?: string;
}

export interface ActiveProject {
  id: string;
  rewardItemId: string;
  seriesName: string;
  userId: string;
  startedAt: string;
  currentCheckIns: number;
  requiredCheckIns: number;
  isCompleted: boolean;
  harvest?: any;
}

export interface RewardItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  series: string;
  checkInsRequired: number;
  animationClass: string;
  possibleHarvests: Harvest[];
}

export interface CelebrationData {
  type: 'badge' | 'streak' | 'milestone';
  badge?: Badge;
  isSeriesComplete?: boolean;
  seriesName?: string;
  reward?: any;
  message?: string;
}