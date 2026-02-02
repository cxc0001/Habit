import { useState, useEffect, useCallback } from 'react'
import { Habit, CheckIn, DailyStats } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { generateId, getDateKey } from '@/lib/utils'

const HABITS_KEY = 'microhabits_habits'
const CHECKINS_KEY = 'microhabits_checkins'

export function useHabits() {
  const { user } = useAuth()
  const [habits, setHabits] = useState<Habit[]>([])
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])

  useEffect(() => {
    if (user) {
      const allHabits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]') as Habit[]
      const userHabits = allHabits.filter((h) => h.userId === user.id)
      setHabits(userHabits)

      const allCheckIns = JSON.parse(localStorage.getItem(CHECKINS_KEY) || '[]') as CheckIn[]
      const userCheckIns = allCheckIns.filter((c) => c.userId === user.id)
      setCheckIns(userCheckIns)
    }
  }, [user])

  const addHabit = useCallback((name: string, description: string, icon: string, color: string) => {
    if (!user) return

    const newHabit: Habit = {
      id: generateId(),
      userId: user.id,
      name,
      description,
      icon,
      color,
      createdAt: new Date().toISOString(),
    }

    const allHabits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]') as Habit[]
    allHabits.push(newHabit)
    localStorage.setItem(HABITS_KEY, JSON.stringify(allHabits))
    setHabits((prev) => [...prev, newHabit])
  }, [user])

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    const allHabits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]') as Habit[]
    const habitIndex = allHabits.findIndex((h) => h.id === id)
    
    if (habitIndex !== -1) {
      allHabits[habitIndex] = { ...allHabits[habitIndex], ...updates }
      localStorage.setItem(HABITS_KEY, JSON.stringify(allHabits))
      setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)))
    }
  }, [])

  const deleteHabit = useCallback((id: string) => {
    const allHabits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]') as Habit[]
    const filtered = allHabits.filter((h) => h.id !== id)
    localStorage.setItem(HABITS_KEY, JSON.stringify(filtered))
    setHabits((prev) => prev.filter((h) => h.id !== id))

    const allCheckIns = JSON.parse(localStorage.getItem(CHECKINS_KEY) || '[]') as CheckIn[]
    const filteredCheckIns = allCheckIns.filter((c) => c.habitId !== id)
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(filteredCheckIns))
    setCheckIns((prev) => prev.filter((c) => c.habitId !== id))
  }, [])

  const checkIn = useCallback((habitId: string): boolean => {
    if (!user) return false

    const today = getDateKey()
    const existingCheckIn = checkIns.find(
      (c) => c.habitId === habitId && c.date === today
    )

    if (existingCheckIn) return false

    // 检查今天是否已经有其他习惯打卡，以控制每日总积分
    const todayCheckIns = checkIns.filter(c => c.date === today && c.userId === user.id)
    
    // 计算今天的总习惯数，用于分配积分
    const totalHabitsForToday = habits.length
    
    // 计算单个习惯的积分（向下取整），确保每天的总积分固定
    let points = 1 // 默认基础积分
    if (totalHabitsForToday > 0) {
      // 设定每天最高积分为2点，根据习惯数量分配
      const maxDailyPoints = 2
      points = Math.max(1, Math.floor(maxDailyPoints / totalHabitsForToday))
      
      // 如果当天已有打卡，只给予基础积分
      if (todayCheckIns.length > 0) {
        points = 1
      }
    }

    const newCheckIn: CheckIn = {
      id: generateId(),
      habitId,
      userId: user.id,
      date: today,
      timestamp: new Date().toISOString(),
    }

    const allCheckIns = JSON.parse(localStorage.getItem(CHECKINS_KEY) || '[]') as CheckIn[]
    allCheckIns.push(newCheckIn)
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(allCheckIns))
    setCheckIns((prev) => [...prev, newCheckIn])

    return true
  }, [user, checkIns, habits])

  const isCheckedInToday = useCallback((habitId: string): boolean => {
    const today = getDateKey()
    return checkIns.some((c) => c.habitId === habitId && c.date === today)
  }, [checkIns])

  const getStreak = useCallback((habitId: string): number => {
    const habitCheckIns = checkIns
      .filter((c) => c.habitId === habitId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (habitCheckIns.length === 0) return 0

    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < habitCheckIns.length; i++) {
      const checkInDate = new Date(habitCheckIns[i].date)
      checkInDate.setHours(0, 0, 0, 0)
      
      const expectedDate = new Date(today)
      expectedDate.setDate(expectedDate.getDate() - i)
      
      if (checkInDate.getTime() === expectedDate.getTime()) {
        streak++
      } else if (i === 0) {
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        if (checkInDate.getTime() === yesterday.getTime()) {
          streak++
          continue
        }
        break
      } else {
        break
      }
    }

    return streak
  }, [checkIns])

  const getTodayProgress = useCallback((): { completed: number; total: number } => {
    const today = getDateKey()
    const todayCheckIns = checkIns.filter((c) => c.date === today)
    return {
      completed: todayCheckIns.length,
      total: habits.length,
    }
  }, [checkIns, habits])

  // 获取最近N天的每日统计数据
  const getDailyStats = useCallback((days: number = 7): DailyStats[] => {
    const stats: DailyStats[] = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateKey = getDateKey(date)
      
      const dayCheckIns = checkIns.filter(c => c.date === dateKey)
      stats.push({
        date: dateKey,
        checkIns: dayCheckIns.length,
      })
    }
    
    return stats
  }, [checkIns])

  // 获取最近N月的月度统计数据
  const getMonthlyStats = useCallback((months: number = 12): DailyStats[] => {
    const stats: DailyStats[] = []
    const today = new Date()
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      const monthCheckIns = checkIns.filter(c => {
        const checkInDate = new Date(c.date)
        return checkInDate.getFullYear() === date.getFullYear() && 
               checkInDate.getMonth() === date.getMonth()
      })
      
      stats.push({
        date: monthKey,
        checkIns: monthCheckIns.length,
      })
    }
    
    return stats
  }, [checkIns])

  // 获取总打卡次数
  const getTotalCheckIns = useCallback((): number => {
    return checkIns.length
  }, [checkIns])

  return {
    habits,
    checkIns,
    addHabit,
    updateHabit,
    deleteHabit,
    checkIn,
    isCheckedInToday,
    getStreak,
    getTodayProgress,
    getDailyStats,
    getMonthlyStats,
    getTotalCheckIns,
  }
}
