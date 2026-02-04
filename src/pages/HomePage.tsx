import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, BarChart3, Sparkles, ChevronRight, LogOut, Trophy, ChevronDown } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { HabitCard } from '@/components/HabitCard'

import { BadgeModal } from '@/components/BadgeModal'
import { CelebrationModal } from '@/components/CelebrationModal'
import { BackgroundDecorations } from '@/components/BackgroundDecorations'
import { useHabits } from '@/hooks/useHabits'
import { useFarm } from '@/hooks/useFarm'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useNavigate } from 'react-router-dom'
import { getRewardById, getRewardsBySeries, categoryInfo, seriesGroups, RewardCategory } from '@/data/rewards'
import { cn } from '@/lib/utils'

export function HomePage() {
  const { user, logout } = useAuth()
  const { habits, checkIn, isCheckedInToday, getStreak, getTodayProgress } = useHabits()
  const { inventory, activeProject, celebration, startProject, progressProject, clearCelebration, getProgress } = useFarm()
  const { addToast } = useToast()
  const navigate = useNavigate()


  const [isBadgeOpen, setIsBadgeOpen] = useState(false)
  const [showSeriesSelector, setShowSeriesSelector] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<RewardCategory>('plant')

  const { completed, total } = getTodayProgress()
  const projectProgress = getProgress()

  // 获取当前培养项目的信息
  const currentItem = activeProject ? getRewardById(activeProject.rewardItemId) : null

  const handleCheckIn = (habitId: string) => {
    const success = checkIn(habitId)
    if (success) {
      // 如果有正在培养的项目，推进进度
      if (activeProject) {
        const result = progressProject()
        if (result.completed && result.celebration) {
          // 庆服弹窗会自动显示
        } else if (result.progressed) {
          addToast('打卡成功! 培养进度+1', 'success')
        }
      } else {
        addToast('打卡成功! 选择一个项目开始培养吧', 'success')
      }
      
      if (completed + 1 === total) {
        setTimeout(() => {
          addToast('太棒了! 今日所有习惯已完成!', 'reward')
        }, 500)
      }
    } else {
      addToast('今天已经打卡过了', 'info')
    }
  }

  const handleStartSeries = (seriesName: string) => {
    const success = startProject(seriesName)
    if (success) {
      const firstItem = getRewardsBySeries(seriesName)[0]
      addToast(`开始培养 ${firstItem?.emoji} ${seriesName}系列!`, 'success')
      setShowSeriesSelector(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen pb-24 md:pt-20 relative">
      <BackgroundDecorations />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-4 md:py-6 relative z-10">
        {/* Header Section */}
        <div className="mb-6">
          {/* Mobile User Info */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <p className="font-bold text-lg">{user?.username}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-secondary" />
                  {inventory.badges.length} 徽章
                </p>
              </div>
            </motion.div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* 培养区域 - 核心展示 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-4 md:p-6 relative overflow-hidden"
          >
            {/* 装饰 */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-cute opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            {activeProject && currentItem ? (
              // 有正在培养的项目
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-sm font-bold', (categoryInfo as any)[currentItem.category]?.color || 'text-primary')}>
                      {(categoryInfo as any)[currentItem.category]?.emoji || '🌱'} {activeProject.seriesName}系列
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {activeProject.currentCheckIns}/{activeProject.requiredCheckIns}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsBadgeOpen(true)}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    查看徽章
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* 动画展示区 */}
                  <motion.div
                    className={cn(
                      'w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center relative',
                      'border-2 border-dashed border-primary/30'
                    )}
                  >
                    <motion.span
                      className={cn('text-4xl md:text-5xl', currentItem.animationClass)}
                      key={activeProject.currentCheckIns}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {currentItem.emoji}
                    </motion.span>
                    
                    {/* 生长动画光环 */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <div className="flex-1 min-w-0"> {/* 添加min-w-0防止flex溢出 */}
                    <h3 className="text-lg md:text-xl font-black mb-1 truncate">{currentItem.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">
                      继续打卡来培养它吧!
                    </p>
                    
                    {/* 进度条 */}
                    <div className="relative h-3 md:h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${projectProgress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {Math.round(projectProgress)}%
                    </p>
                  </div>
                </div>

                {/* 系列预览 - 减少间距和尺寸 */}
                <div className="mt-3 pt-3 border-t border-dashed border-border">
                  <p className="text-xs text-muted-foreground mb-1.5">系列徽章:</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {getRewardsBySeries(activeProject.seriesName).map((item: any, i: number) => {
                      const isUnlocked = inventory.badges.some(b => b.name === item.possibleHarvests[0].name)
                      const isCurrent = item.id === activeProject.rewardItemId
                      return (
                        <motion.div
                          key={item.id}
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center text-lg border',
                            isUnlocked 
                              ? 'bg-primary/10 border-primary/30' 
                              : isCurrent
                              ? 'bg-secondary/10 border-secondary/30'
                              : 'bg-muted/50 border-transparent grayscale opacity-40'
                          )}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {item.emoji}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              // 没有培养项目 - 选择器
              <div className="text-center py-2">
                <motion.div
                  className="text-4xl md:text-5xl mb-2"
                  animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌱
                </motion.div>
                <h3 className="text-lg md:text-xl font-black mb-1">选择一个系列开始培养</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  每次打卡都会推进培养进度，完成后获得徽章!
                </p>
                
                <motion.button
                  onClick={() => setShowSeriesSelector(!showSeriesSelector)}
                  className="btn-primary inline-flex items-center gap-2 text-sm py-2 px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  选择培养项目
                  <ChevronDown className={cn(
                    'w-4 h-4 transition-transform',
                    showSeriesSelector && 'rotate-180'
                  )} />
                </motion.button>

                <AnimatePresence>
                  {showSeriesSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      {/* 分类切换 */}
                      <div className="flex justify-center gap-2 mb-4 flex-wrap">
                        {(['plant', 'animal', 'cooking'] as const).map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                              'px-4 py-2 rounded-xl text-sm font-bold transition-all',
                              selectedCategory === cat
                                ? 'bg-primary text-white'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            )}
                          >
                            {(categoryInfo as any)[cat].emoji} {(categoryInfo as any)[cat].label}
                          </button>
                        ))}
                      </div>

                      {/* 系列列表 */}
                      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {seriesGroups[selectedCategory].map((seriesName, i) => {
                          const firstItem = getRewardsBySeries(seriesName)[0]
                          const isCompleted = inventory.completedSeries.includes(seriesName)
                          return (
                            <motion.button
                              key={seriesName}
                              onClick={() => !isCompleted && handleStartSeries(seriesName)}
                              disabled={isCompleted}
                              className={cn(
                                'p-3 rounded-2xl border-2 text-center transition-all',
                                isCompleted
                                  ? 'border-primary/30 bg-primary/5 opacity-60'
                                  : 'border-border bg-card hover:border-primary hover:bg-primary/5'
                              )}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                              whileHover={!isCompleted ? { scale: 1.05 } : undefined}
                            >
                              <span className="text-2xl block mb-1">{firstItem?.emoji}</span>
                              <span className="text-xs font-medium">{seriesName}</span>
                              {isCompleted && (
                                <span className="text-xs text-primary block">已完成</span>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* 快捷操作栏 */}
          <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <motion.button
                onClick={() => setIsBadgeOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-warm text-white text-xs md:text-sm font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                徽章 {inventory.badges.length}
              </motion.button>
              <motion.button
                onClick={() => navigate('/reports')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent/15 text-accent text-xs md:text-sm font-bold border border-accent/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
                统计
              </motion.button>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground font-medium">
              今日 <span className="text-primary font-bold">{completed}</span>/{total}
            </div>
          </div>
        </div>

        {/* Habits Section - Only for checking in, no edit/delete */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="text-2xl">📋</span> 我的习惯
            </h2>
            <button
              onClick={() => navigate('/manage')}
              className="btn-ghost text-sm flex items-center gap-1"
            >
              管理
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {habits.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-8 text-center"
            >
              <motion.div 
                className="w-20 h-20 rounded-3xl bg-gradient-cute mx-auto flex items-center justify-center mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="font-bold text-xl mb-2">开始你的习惯之旅</h3>
              <p className="text-muted-foreground text-sm mb-6 font-medium">
                去管理页面添加你的第一个习惯吧!
              </p>
              <motion.button
                onClick={() => navigate('/manage')}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                去管理页面添加
              </motion.button>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {habits.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <HabitCard
                    habit={habit}
                    isCheckedIn={isCheckedInToday(habit.id)}
                    streak={getStreak(habit.id)}
                    onCheckIn={() => handleCheckIn(habit.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* Modals */}

      <BadgeModal isOpen={isBadgeOpen} onClose={() => setIsBadgeOpen(false)} />
      <CelebrationModal data={celebration} onClose={clearCelebration} />
    </div>
  )
}
