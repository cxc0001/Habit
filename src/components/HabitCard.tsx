import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Flame } from 'lucide-react'
import { Habit } from '@/types'
import { cn } from '@/lib/utils'

interface HabitCardProps {
  habit: Habit
  isCheckedIn: boolean
  streak: number
  onCheckIn: () => void
}

export function HabitCard({
  habit,
  isCheckedIn,
  streak,
  onCheckIn,
}: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCheckIn = () => {
    if (isCheckedIn) return
    setIsAnimating(true)
    onCheckIn()
    setTimeout(() => setIsAnimating(false), 800)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        'glass-card rounded-3xl p-4 relative overflow-hidden',
        isCheckedIn && 'bg-primary/5 border-primary/40'
      )}
      whileHover={{ scale: 1.01 }}
    >
      {/* 背景装饰 */}
      {isCheckedIn && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      <div className="flex items-center gap-4 relative">
        {/* 习惯图标 */}
        <motion.div
          className="w-12 h-12 rounded-2xl bg-muted/80 flex items-center justify-center text-2xl"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          {habit.icon}
        </motion.div>

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={cn(
              'font-bold text-base truncate',
              isCheckedIn && 'text-primary'
            )}>
              {habit.name}
            </h3>
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-2 py-0.5 bg-gradient-warm rounded-full text-xs font-bold text-white"
              >
                <Flame className="w-3 h-3" />
                {streak}天
              </motion.div>
            )}
          </div>
          {habit.description && (
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1 font-medium">
              {habit.description}
            </p>
          )}
        </div>

        {/* 打卡按钮 - 更加明显和直观 */}
        <motion.button
          onClick={handleCheckIn}
          disabled={isCheckedIn}
          className={cn(
            'relative px-5 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all',
            isCheckedIn
              ? 'bg-primary text-white'
              : 'bg-gradient-primary text-white hover:shadow-lg'
          )}
          whileHover={!isCheckedIn ? { scale: 1.05, y: -2 } : undefined}
          whileTap={!isCheckedIn ? { scale: 0.95 } : undefined}
          animate={isAnimating ? { scale: [1, 1.2, 1] } : undefined}
        >
          {isCheckedIn ? (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="w-4 h-4" strokeWidth={3} />
              </motion.div>
              已完成
            </>
          ) : (
            '打卡'
          )}
          
          {/* 打卡成功动画 */}
          {isAnimating && (
            <>
              <motion.div
                className="absolute inset-0 bg-secondary/30 rounded-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              {/* 星星效果 */}
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-lg"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 80,
                    y: (Math.random() - 0.5) * 80,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  ⭐
                </motion.span>
              ))}
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
