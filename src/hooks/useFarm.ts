import { useState, useEffect, useCallback } from 'react'
import { ActiveProject, UserInventory, Badge, CelebrationData } from '@/types'
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

  useEffect(() => {
    if (user) {
      const allInventories = JSON.parse(localStorage.getItem(INVENTORY_KEY) || '{}')
      const userInventory = allInventories[user.id] || { badges: [], completedSeries: [] }
      setInventory(userInventory)

      const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]') as ActiveProject[]
      const userProject = allProjects.find((p) => p.userId === user.id && !p.isCompleted)
      setActiveProject(userProject || null)
    }
  }, [user])

  const saveInventory = useCallback((newInventory: UserInventory) => {
    if (!user) return
    const allInventories = JSON.parse(localStorage.getItem(INVENTORY_KEY) || '{}')
    allInventories[user.id] = newInventory
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(allInventories))
    setInventory(newInventory)
  }, [user])

  // 开始培养一个系列
  const startProject = useCallback((seriesName: string): boolean => {
    if (!user || activeProject) return false

    // 获取该系列的第一个项目
    const seriesItems = getRewardsBySeries(seriesName).sort((a, b) => a.checkInsRequired - b.checkInsRequired)
    if (seriesItems.length === 0) return false

    const firstItem = seriesItems[0]

    const project: ActiveProject = {
      id: generateId(),
      rewardItemId: firstItem.id,
      seriesName,
      userId: user.id,
      startedAt: new Date().toISOString(),
      currentCheckIns: 0,
      requiredCheckIns: firstItem.checkInsRequired,
      isCompleted: false,
    }

    const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]') as ActiveProject[]
    allProjects.push(project)
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
    setActiveProject(project)

    return true
  }, [user, activeProject])

  // 打卡时推进培养进度
  const progressProject = useCallback((): { 
    progressed: boolean
    completed: boolean
    celebration?: CelebrationData
  } => {
    if (!user || !activeProject) return { progressed: false, completed: false }

    const newCheckIns = activeProject.currentCheckIns + 1
    const item = getRewardById(activeProject.rewardItemId)
    
    if (!item) return { progressed: false, completed: false }

    // 检查是否完成当前阶段
    if (newCheckIns >= activeProject.requiredCheckIns) {
      // 完成当前阶段，获得徽章
      const harvest = item.possibleHarvests[0]
      const badge: Badge = {
        id: generateId(),
        name: harvest.name,
        emoji: harvest.emoji,
        rarity: harvest.rarity,
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

        const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]') as ActiveProject[]
        const projectIndex = allProjects.findIndex((p) => p.id === activeProject.id)
        if (projectIndex !== -1) {
          allProjects[projectIndex] = updatedProject
          localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
        }
        setActiveProject(updatedProject)

        celebrationData = {
          badge,
          isSeriesComplete: false,
          seriesName: activeProject.seriesName,
        }
      } else {
        // 系列完成!
        const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]') as ActiveProject[]
        const projectIndex = allProjects.findIndex((p) => p.id === activeProject.id)
        if (projectIndex !== -1) {
          allProjects[projectIndex] = { ...activeProject, isCompleted: true, harvest: harvest }
          localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
        }
        setActiveProject(null)

        newCompletedSeries = [...newCompletedSeries, activeProject.seriesName]

        celebrationData = {
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

      const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]') as ActiveProject[]
      const projectIndex = allProjects.findIndex((p) => p.id === activeProject.id)
      if (projectIndex !== -1) {
        allProjects[projectIndex] = updatedProject
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects))
      }
      setActiveProject(updatedProject)

      return { progressed: true, completed: false }
    }
  }, [user, activeProject, inventory, saveInventory])

  const clearCelebration = useCallback(() => {
    setCelebration(null)
  }, [])

  const getProgress = useCallback((): number => {
    if (!activeProject) return 0
    return (activeProject.currentCheckIns / activeProject.requiredCheckIns) * 100
  }, [activeProject])

  // 获取所有可选的系列
  const getAvailableSeries = useCallback((category: RewardCategory): string[] => {
    return seriesGroups[category]
  }, [])

  // 获取系列的所有徽章
  const getSeriesBadges = useCallback((seriesName: string) => {
    const seriesItems = getRewardsBySeries(seriesName)
    return seriesItems.map(item => {
      const harvest = item.possibleHarvests[0]
      const owned = inventory.badges.find(b => b.name === harvest.name)
      return {
        name: harvest.name,
        emoji: harvest.emoji,
        rarity: harvest.rarity,
        unlocked: !!owned,
        checkInsRequired: item.checkInsRequired,
      }
    })
  }, [inventory.badges])

  // 获取按系列分组的徽章
  const getBadgesBySeries = useCallback(() => {
    const result: Record<string, { name: string; emoji: string; rarity: string; unlocked: boolean }[]> = {}
    
    Object.values(seriesGroups).forEach((seriesList) => {
      seriesList.forEach(seriesName => {
        result[seriesName] = getSeriesBadges(seriesName)
      })
    })
    
    return result
  }, [getSeriesBadges])

  return {
    inventory,
    activeProject,
    celebration,
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
