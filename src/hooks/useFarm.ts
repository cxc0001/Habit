import { useState, useEffect, useCallback } from 'react'
import { ActiveProject, Inventory as UserInventory, Badge, CelebrationData } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { allRewardItems, getRewardById, getRewardsBySeries, seriesGroups, RewardCategory } from '@/data/rewards'
import { generateId } from '@/lib/utils'

const INVENTORY_KEY = 'microhabits_inventory'
const PROJECTS_KEY = 'microhabits_projects'

export function useFarm() {
  const { user } = useAuth()
  const [inventory, setInventory] = useState<UserInventory>({ badges: [], completedSeries: [] })
  const [activeProject, setActiveProject] = useState<ActiveProject | null>(null)
  const [celebration, setCelebration] = useState<CelebrationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // 安全地从 localStorage 读取数据
  const safeParseJSON = useCallback((key: string, defaultValue: any) => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return defaultValue
      return JSON.parse(item)
    } catch (error) {
      console.warn(`解析 ${key} 失败:`, error)
      return defaultValue
    }
  }, [])

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      setIsInitialized(true)
      return
    }

    try {
      setIsLoading(true)
      
      // 同步读取数据，但添加延迟以稳定状态
      const allInventories = safeParseJSON(INVENTORY_KEY, {})
      const userInventory = allInventories[user.id] || { badges: [], completedSeries: [] }
      
      const allProjects = safeParseJSON(PROJECTS_KEY, []) as ActiveProject[]
      const userProject = allProjects.find((p) => p.userId === user.id && !p.isCompleted)

      // 一次性更新所有状态
      setInventory(userInventory)
      setActiveProject(userProject || null)
      setIsInitialized(true)
    } catch (error) {
      console.error('加载农场数据失败:', error)
      // 重置为默认值
      setInventory({ badges: [], completedSeries: [] })
      setActiveProject(null)
      setIsInitialized(true)
    } finally {
      // 添加微小延迟确保状态稳定
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [user, safeParseJSON])

  const saveInventory = useCallback((newInventory: UserInventory) => {
    if (!user) return
    try {
      const allInventories = safeParseJSON(INVENTORY_KEY, {})
      allInventories[user.id] = newInventory
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(allInventories))
      setInventory(newInventory)
    } catch (error) {
      console.error('保存库存失败:', error)
    }
  }, [user, safeParseJSON])

  // 开始培养一个系列
  const startProject = useCallback((seriesName: string): boolean => {
    if (!user || activeProject) return false

    try {
      // 获取该系列的第一个项目
      const seriesItems = getRewardsBySeries(seriesName).sort((a, b) => a.checkInsRequired - b.checkInsRequired)
      if (seriesItems.length === 0) return false

      const firstItem = seriesItems[0]

      const project: ActiveProject = {
        id: generateId(),
        rewardItemId: firstItem.id,
        seriesName: seriesName,
        userId: user.id,
        startedAt: new Date().toISOString(),
        currentCheckIns: 0,
        requiredCheckIns: firstItem.checkInsRequired,
        isCompleted: false,
      }

      const allProjects = safeParseJSON(PROJECTS_KEY, []) as ActiveProject[]
      allProjects.push(project)
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
      setActiveProject(project)

      return true
    } catch (error) {
      console.error('开始项目失败:', error)
      return false
    }
  }, [user, activeProject, safeParseJSON])

  // 打卡时推进培养进度
  const progressProject = useCallback((): { 
    progressed: boolean
    completed: boolean
    celebration?: CelebrationData
  } => {
    if (!user || !activeProject) return { progressed: false, completed: false }

    try {
      const newCheckIns = activeProject.currentCheckIns + 1
      const item = getRewardById(activeProject.rewardItemId)
      
      if (!item) {
        console.warn('找不到奖励项:', activeProject.rewardItemId)
        return { progressed: false, completed: false }
      }

      // 检查是否完成当前阶段
      if (newCheckIns >= activeProject.requiredCheckIns) {
        // 完成当前阶段，获得徽章
        const harvest = item.possibleHarvests[0]
        const badge: Badge = {
          id: generateId(),
          name: harvest.name,
          emoji: harvest.emoji,
          rarity: harvest.rarity || 'common',
          unlocked: true,
          checkInsRequired: item.checkInsRequired,
          series: activeProject.seriesName,
          unlockedAt: new Date().toISOString(),
        }

        // 添加徽章到仓库
        const newBadges = [...inventory.badges, badge]
        
        // 检查是否有下一个阶段
        const seriesItems = getRewardsBySeries(activeProject.seriesName)
          .sort((a, b) => a.checkInsRequired - b.checkInsRequired)
        const currentIndex = seriesItems.findIndex(i => i.id === item.id)
        const nextItem = seriesItems[currentIndex + 1]

        let celebrationData: CelebrationData
        let newCompletedSeries = [...inventory.completedSeries]

        if (nextItem) {
          // 进入下一阶段
          const updatedProject: ActiveProject = {
            ...activeProject,
            rewardItemId: nextItem.id,
            currentCheckIns: 0,
            requiredCheckIns: nextItem.checkInsRequired,
          }

          const allProjects = safeParseJSON(PROJECTS_KEY, []) as ActiveProject[]
          const projectIndex = allProjects.findIndex((p) => p.id === activeProject.id)
          if (projectIndex !== -1) {
            allProjects[projectIndex] = updatedProject
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
          }
          setActiveProject(updatedProject)

          celebrationData = {
            type: 'badge',
            badge,
            isSeriesComplete: false,
            seriesName: activeProject.seriesName,
          }
        } else {
          // 系列完成!
          const allProjects = safeParseJSON(PROJECTS_KEY, []) as ActiveProject[]
          const projectIndex = allProjects.findIndex((p) => p.id === activeProject.id)
          if (projectIndex !== -1) {
            allProjects[projectIndex] = { ...activeProject, isCompleted: true }
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
          }
          setActiveProject(null)

          newCompletedSeries = [...newCompletedSeries, activeProject.seriesName]

          celebrationData = {
            type: 'badge',
            badge,
            isSeriesComplete: true,
            seriesName: activeProject.seriesName,
          }
        }

        saveInventory({ badges: newBadges, completedSeries: newCompletedSeries })
        setCelebration(celebrationData)

        return { progressed: true, completed: true, celebration: celebrationData }
      } else {
        // 继续当前阶段
        const updatedProject: ActiveProject = {
          ...activeProject,
          currentCheckIns: newCheckIns,
        }

        const allProjects = safeParseJSON(PROJECTS_KEY, []) as ActiveProject[]
        const projectIndex = allProjects.findIndex((p) => p.id === activeProject.id)
        if (projectIndex !== -1) {
          allProjects[projectIndex] = updatedProject
          localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
        }
        setActiveProject(updatedProject)

        return { progressed: true, completed: false }
      }
    } catch (error) {
      console.error('推进项目进度失败:', error)
      return { progressed: false, completed: false }
    }
  }, [user, activeProject, inventory, saveInventory, safeParseJSON])

  const clearCelebration = useCallback(() => {
    setCelebration(null)
  }, [])

  const getProgress = useCallback((): number => {
    if (!activeProject) return 0
    return (activeProject.currentCheckIns / activeProject.requiredCheckIns) * 100
  }, [activeProject])

  // 获取所有可选的系列
  const getAvailableSeries = useCallback((category: RewardCategory): string[] => {
    return seriesGroups[category] || []
  }, [])

  // 获取系列的所有徽章
  const getSeriesBadges = useCallback((seriesName: string) => {
    try {
      const seriesItems = getRewardsBySeries(seriesName)
      return seriesItems.map(item => {
        const harvest = item.possibleHarvests[0]
        const owned = inventory.badges.find((b: Badge) => b.name === harvest.name)
        return {
          name: harvest.name,
          emoji: harvest.emoji,
          rarity: harvest.rarity || 'common',
          unlocked: !!owned,
          checkInsRequired: item.checkInsRequired,
        }
      })
    } catch (error) {
      console.warn(`获取系列 ${seriesName} 徽章失败:`, error)
      return []
    }
  }, [inventory.badges])

  // 获取按系列分组的徽章
  const getBadgesBySeries = useCallback(() => {
    const result: Record<string, { name: string; emoji: string; rarity: string; unlocked: boolean }[]> = {}
    
    try {
      Object.values(seriesGroups).forEach((seriesList) => {
        seriesList.forEach(seriesName => {
          result[seriesName] = getSeriesBadges(seriesName)
        })
      })
    } catch (error) {
      console.warn('获取分组徽章失败:', error)
    }
    
    return result
  }, [getSeriesBadges])

  return {
    inventory,
    activeProject,
    celebration,
    isLoading,
    isInitialized,
    startProject,
    progressProject,
    clearCelebration,
    getProgress,
    getAvailableSeries,
    getSeriesBadges,
    getBadgesBySeries,
    allRewardItems,
  }
}