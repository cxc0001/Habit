import { motion } from 'framer-motion'
import { DailyStats } from '@/types'

interface BarChartProps {
  data: DailyStats[]
  height?: number
}

export function BarChart({ data, height = 120 }: BarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center text-muted-foreground text-sm" style={{ height }}>
        暂无数据
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.checkIns), 1)

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between gap-1 h-full pb-6">
        {data.map((item, i) => {
          const barHeight = (item.checkIns / maxValue) * (height - 30)
          const dayLabel = item.date.slice(5) // MM-DD
          
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-primary relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: barHeight || 4 }}
                transition={{ delay: i * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
              >
                {item.checkIns > 0 && (
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ y: '100%' }}
                    animate={{ y: '-100%' }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.05, repeat: Infinity, repeatDelay: 2 }}
                  />
                )}
                {/* 数值标签 */}
                {item.checkIns > 0 && (
                  <motion.span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {item.checkIns}
                  </motion.span>
                )}
              </motion.div>
              <span className="text-xs text-muted-foreground font-medium truncate w-full text-center">
                {dayLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className || ''}`}>
      <svg width={size} height={size} className="progress-ring">
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

interface DonutChartProps {
  value: number
  maxValue: number
  size?: number
  strokeWidth?: number
  label?: string
}

export function DonutChart({ value, maxValue, size = 80, strokeWidth = 8, label }: DonutChartProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = Math.min(value / maxValue, 1)
  const offset = circumference - progress * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold">{Math.round(progress * 100)}%</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}
