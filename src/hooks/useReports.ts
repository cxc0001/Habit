import { useState, useEffect, useCallback } from 'react'
import { Report, CheckIn, Habit } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { generateId, getDateKey } from '@/lib/utils'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays } from 'date-fns'

const REPORTS_KEY = 'microhabits_reports'
const CHECKINS_KEY = 'microhabits_checkins'
const HABITS_KEY = 'microhabits_habits'
const PLANTED_KEY = 'microhabits_planted'

export function useReports() {
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (user) {
      loadReports()
      checkAndGenerateReports()
    }
  }, [user])

  const loadReports = useCallback(() => {
    if (!user) return
    const allReports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]') as Report[]
    const userReports = allReports.filter((r) => r.userId === user.id)
    setReports(userReports)
    setUnreadCount(userReports.filter((r) => !r.isRead).length)
  }, [user])

  const getCheckInsInRange = useCallback((startDate: Date, endDate: Date): CheckIn[] => {
    if (!user) return []
    const allCheckIns = JSON.parse(localStorage.getItem(CHECKINS_KEY) || '[]') as CheckIn[]
    return allCheckIns.filter((c) => {
      const checkInDate = new Date(c.date)
      return c.userId === user.id && checkInDate >= startDate && checkInDate <= endDate
    })
  }, [user])

  const calculateStats = useCallback((checkIns: CheckIn[], startDate: Date, endDate: Date) => {
    if (!user) return { totalCheckIns: 0, successRate: 0, longestStreak: 0, currentStreak: 0, totalPoints: 0 }

    const habits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]') as Habit[]
    const userHabits = habits.filter((h) => h.userId === user.id)

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const maxPossibleCheckIns = totalDays * userHabits.length

    const totalCheckIns = checkIns.length
    const successRate = maxPossibleCheckIns > 0 ? Math.round((totalCheckIns / maxPossibleCheckIns) * 100) : 0
    const totalPoints = checkIns.length

    // Calculate streaks
    const sortedDates = [...new Set(checkIns.map((c) => c.date))].sort()
    let longestStreak = 0
    let currentStreak = 0
    let tempStreak = 0
    const today = getDateKey()

    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1
      } else {
        const prevDate = new Date(sortedDates[i - 1])
        const currDate = new Date(sortedDates[i])
        const diffDays = Math.ceil((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) {
          tempStreak++
        } else {
          longestStreak = Math.max(longestStreak, tempStreak)
          tempStreak = 1
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak)
      
      if (sortedDates[i] === today || sortedDates[i] === getDateKey(subDays(new Date(), 1))) {
        currentStreak = tempStreak
      }
    }

    return { totalCheckIns, successRate, longestStreak, currentStreak, totalPoints }
  }, [user])

  const generateReport = useCallback((type: 'weekly' | 'monthly' | 'yearly') => {
    if (!user) return null

    const now = new Date()
    let startDate: Date
    let endDate: Date

    switch (type) {
      case 'weekly':
        startDate = startOfWeek(subDays(now, 7), { weekStartsOn: 1 })
        endDate = endOfWeek(subDays(now, 7), { weekStartsOn: 1 })
        break
      case 'monthly':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        startDate = startOfMonth(lastMonth)
        endDate = endOfMonth(lastMonth)
        break
      case 'yearly':
        const lastYear = new Date(now.getFullYear() - 1, 0, 1)
        startDate = startOfYear(lastYear)
        endDate = endOfYear(lastYear)
        break
    }

    const checkIns = getCheckInsInRange(startDate, endDate)
    const stats = calculateStats(checkIns, startDate, endDate)

    // Get harvests count
    const allPlanted = JSON.parse(localStorage.getItem(PLANTED_KEY) || '[]')
    const harvestsCollected = allPlanted.filter((p: any) => 
      p.userId === user.id && 
      p.isHarvested && 
      new Date(p.harvestAt) >= startDate && 
      new Date(p.harvestAt) <= endDate
    ).length

    const report: Report = {
      id: generateId(),
      userId: user.id,
      type,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      generatedAt: now.toISOString(),
      ...stats,
      badgesCollected: harvestsCollected,
      totalPoints: stats.totalPoints,
      isRead: false,
    }

    return report
  }, [user, getCheckInsInRange, calculateStats])

  const checkAndGenerateReports = useCallback(() => {
    if (!user) return

    const allReports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]') as Report[]
    const userReports = allReports.filter((r) => r.userId === user.id)
    const now = new Date()

    // Check for weekly report (Monday)
    if (now.getDay() === 1) {
      const lastWeekStart = startOfWeek(subDays(now, 7), { weekStartsOn: 1 })
      const hasWeeklyReport = userReports.some(
        (r) => r.type === 'weekly' && new Date(r.startDate).getTime() === lastWeekStart.getTime()
      )
      if (!hasWeeklyReport) {
        const report = generateReport('weekly')
        if (report) {
          allReports.push(report)
          localStorage.setItem(REPORTS_KEY, JSON.stringify(allReports))
        }
      }
    }

    // Check for monthly report (1st of month)
    if (now.getDate() === 1) {
      const lastMonthStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1))
      const hasMonthlyReport = userReports.some(
        (r) => r.type === 'monthly' && new Date(r.startDate).getTime() === lastMonthStart.getTime()
      )
      if (!hasMonthlyReport) {
        const report = generateReport('monthly')
        if (report) {
          allReports.push(report)
          localStorage.setItem(REPORTS_KEY, JSON.stringify(allReports))
        }
      }
    }

    // Check for yearly report (Jan 1st)
    if (now.getMonth() === 0 && now.getDate() === 1) {
      const lastYearStart = startOfYear(new Date(now.getFullYear() - 1, 0, 1))
      const hasYearlyReport = userReports.some(
        (r) => r.type === 'yearly' && new Date(r.startDate).getTime() === lastYearStart.getTime()
      )
      if (!hasYearlyReport) {
        const report = generateReport('yearly')
        if (report) {
          allReports.push(report)
          localStorage.setItem(REPORTS_KEY, JSON.stringify(allReports))
        }
      }
    }

    loadReports()
  }, [user, generateReport, loadReports])

  const markAsRead = useCallback((reportId: string) => {
    const allReports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]') as Report[]
    const reportIndex = allReports.findIndex((r) => r.id === reportId)
    if (reportIndex !== -1) {
      allReports[reportIndex].isRead = true
      localStorage.setItem(REPORTS_KEY, JSON.stringify(allReports))
      loadReports()
    }
  }, [loadReports])

  const getReportsByType = useCallback((type: 'weekly' | 'monthly' | 'yearly'): Report[] => {
    return reports.filter((r) => r.type === type).sort((a, b) => 
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    )
  }, [reports])

  // Generate demo report for display
  const generateCurrentReport = useCallback((type: 'weekly' | 'monthly' | 'yearly') => {
    if (!user) return null

    const now = new Date()
    let startDate: Date
    let endDate: Date

    switch (type) {
      case 'weekly':
        startDate = startOfWeek(now, { weekStartsOn: 1 })
        endDate = now
        break
      case 'monthly':
        startDate = startOfMonth(now)
        endDate = now
        break
      case 'yearly':
        startDate = startOfYear(now)
        endDate = now
        break
    }

    const checkIns = getCheckInsInRange(startDate, endDate)
    const stats = calculateStats(checkIns, startDate, endDate)

    const allPlanted = JSON.parse(localStorage.getItem(PLANTED_KEY) || '[]')
    const harvestsCollected = allPlanted.filter((p: any) => 
      p.userId === user.id && 
      p.isHarvested && 
      new Date(p.harvestAt) >= startDate && 
      new Date(p.harvestAt) <= endDate
    ).length

    return {
      ...stats,
      badgesCollected: harvestsCollected,
      startDate,
      endDate,
    }
  }, [user, getCheckInsInRange, calculateStats])

  return {
    reports,
    unreadCount,
    markAsRead,
    getReportsByType,
    generateCurrentReport,
  }
}
