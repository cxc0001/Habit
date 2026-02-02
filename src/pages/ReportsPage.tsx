import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Calendar, TrendingUp, Award, Leaf, Flame, ArrowLeft } from 'lucide-react'
import { useReports } from '@/hooks/useReports'
import { useHabits } from '@/hooks/useHabits'
import { BarChart, DonutChart } from '@/components/Charts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { BackgroundDecorations } from '@/components/BackgroundDecorations'
import { Navigation } from '@/components/Navigation'
import { useNavigate } from 'react-router-dom'

type ReportType = 'weekly' | 'monthly' | 'yearly'

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportType>('weekly')
  const { generateCurrentReport } = useReports()
  const { getDailyStats, getMonthlyStats, habits } = useHabits()
  const navigate = useNavigate()

  const report = generateCurrentReport(activeTab)
  const dailyStats = activeTab === 'yearly' 
    ? getMonthlyStats(12) 
    : getDailyStats(activeTab === 'weekly' ? 7 : 30)

  const tabs = [
    { id: 'weekly' as const, label: '周报', icon: Calendar },
    { id: 'monthly' as const, label: '月报', icon: BarChart3 },
    { id: 'yearly' as const, label: '年报', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen pb-24 relative">
      <BackgroundDecorations />
      
      <main className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-cute"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-xl font-bold">统计报告</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-2 border-border rounded-2xl mb-6 overflow-hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all',
                  activeTab === tab.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        {report ? (
          <div className="space-y-5">
            <div className="text-center text-sm text-muted-foreground font-medium">
              {format(report.startDate, 'yyyy年M月d日', { locale: zhCN })} -{' '}
              {format(report.endDate, 'yyyy年M月d日', { locale: zhCN })}
            </div>

            {/* 打卡趋势图 */}
            <motion.div 
              className="glass-card rounded-2xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                {activeTab === 'yearly' ? '月打卡趋势' : '打卡趋势'}
              </h3>
              <div className="overflow-x-auto pb-2">
                <div className="min-w-max">
                  <BarChart data={dailyStats} height={140} />
                </div>
              </div>
            </motion.div>

            {/* 不同习惯的打卡统计 */}
            {habits.length > 0 && (
              <motion.div 
                className="glass-card rounded-2xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  各习惯打卡统计
                </h3>
                <div className="space-y-2">
                  {habits.map((habit) => {
                    // 计算该习惯在此期间的打卡次数
                    const checkIns = JSON.parse(localStorage.getItem('microhabits_checkins') || '[]')
                    const habitCheckIns = checkIns.filter((c: any) => 
                      c.habitId === habit.id && 
                      new Date(c.date) >= new Date(report.startDate) && 
                      new Date(c.date) <= new Date(report.endDate)
                    ).length
                    
                    return (
                      <div key={habit.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{habit.icon}</span>
                          <span className="text-sm font-medium">{habit.name}</span>
                        </div>
                        <span className="text-sm font-bold text-primary">{habitCheckIns}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* 核心数据卡片 */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="glass-card p-4 rounded-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">打卡次数</span>
                </div>
                <p className="text-3xl font-black">{report.totalCheckIns}</p>
              </motion.div>

              <motion.div
                className="glass-card p-4 rounded-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">完成率</span>
                </div>
                <p className="text-3xl font-black text-accent">{report.successRate}%</p>
              </motion.div>

              <motion.div
                className="glass-card p-4 rounded-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">最长连续</span>
                </div>
                <p className="text-3xl font-black text-secondary">{report.longestStreak}天</p>
              </motion.div>

              <motion.div
                className="glass-card p-4 rounded-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-success/20 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">收获数量</span>
                </div>
                <p className="text-3xl font-black text-success">{report.badgesCollected || 0}</p>
              </motion.div>
            </div>

            {/* 积分统计 */}
            <motion.div 
              className="glass-card p-4 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-bold">获得积分</span>
                </div>
                <span className="text-2xl font-black text-gradient">{report.totalPoints}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, report.successRate)}%` }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="h-full bg-gradient-primary rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[waveShine_2s_ease-in-out_infinite]" />
              </div>
            </motion.div>

            {/* 当前连续打卡 */}
            {report.currentStreak > 0 && (
              <motion.div 
                className="text-center p-5 bg-gradient-primary rounded-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <p className="text-sm font-medium opacity-90">当前连续打卡</p>
                <motion.p 
                  className="text-5xl font-black mt-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {report.currentStreak}天
                </motion.p>
                <p className="text-xs opacity-80 mt-2">继续保持，你很棒! 🔥</p>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <motion.div 
              className="text-6xl mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📊
            </motion.div>
            <p className="font-bold">暂无数据</p>
            <p className="text-sm mt-2">开始打卡后即可查看统计</p>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  )
}