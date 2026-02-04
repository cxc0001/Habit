import { motion } from 'framer-motion'

// 定义DailyStats类型
export interface DailyStats {
  date: string;
  checkIns: number;
}

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

  // 添加安全检查防止NaN
  const validData = data.filter(item => typeof item.checkIns === 'number' && !isNaN(item.checkIns))
  if (validData.length === 0) {
    return (
      <div className="flex items-center justify-center text-muted-foreground text-sm" style={{ height }}>
        数据无效
      </div>
    )
  }
  
  const maxValue = Math.max(...validData.map(d => d.checkIns), 1)
  if (maxValue <= 0) {
    return (
      <div className="flex items-center justify-center text-muted-foreground text-sm" style={{ height }}>
        暂无数据
      </div>
    )
  }

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between gap-1 h-full pb-6">
        {validData.map((item, i) => {
          // 确保数值安全
          const safeCheckIns = isNaN(item.checkIns) ? 0 : item.checkIns
          const barHeight = (safeCheckIns / maxValue) * (height - 30)
          
          // 判断是否为月份格式 (YYYY-MM) 或日期格式 (YYYY-MM-DD)
          let displayLabel = '未知'
          if (item.date) {
            if (item.date.match(/^\d{4}-\d{2}$/)) {
              // 月份格式 YYYY-MM
              const [, month] = item.date.split('-') // 使用逗号跳过第一个元素（年份）
              displayLabel = `${month}月`
            } else {
              // 日期格式 YYYY-MM-DD
              displayLabel = item.date.slice(5) // MM-DD
            }
          }
          
          return (
            <div 
              key={`${item.date}-${i}`} 
              className="flex-1 flex flex-col items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-primary relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: isNaN(barHeight) || barHeight <= 0 ? 4 : barHeight }}
                transition={{ delay: i * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
                onClick={(e) => e.stopPropagation()}
              >
                {safeCheckIns > 0 && (
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ y: '100%' }}
                    animate={{ y: '-100%' }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.05, repeat: Infinity, repeatDelay: 2 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {/* 数值标签 */}
                {safeCheckIns > 0 && (
                  <motion.span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {safeCheckIns}
                  </motion.span>
                )}
              </motion.div>
              <span 
                className="text-xs text-muted-foreground font-medium truncate w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {displayLabel}
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
  // 确保输入值有效
  const safeProgress = isNaN(progress) || progress < 0 ? 0 : Math.min(progress, 100);
  const safeSize = isNaN(size) || size <= 0 ? 120 : size;
  const safeStrokeWidth = isNaN(strokeWidth) || strokeWidth <= 0 ? 8 : strokeWidth;
  
  const radius = (safeSize - safeStrokeWidth) / 2;
  const safeRadius = isNaN(radius) || radius <= 0 ? 1 : radius;
  const circumference = safeRadius * 2 * Math.PI;
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className || ''}`}>
      <svg width={safeSize} height={safeSize} className="progress-ring">
        <circle
          className="text-muted"
          strokeWidth={safeStrokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={safeRadius}
          cx={safeSize / 2}
          cy={safeSize / 2}
        />
        <motion.circle
          className="text-primary"
          strokeWidth={safeStrokeWidth}
          strokeDasharray={isNaN(circumference) ? 0 : circumference}
          strokeDashoffset={isNaN(circumference) ? 0 : circumference}
          initial={{ strokeDashoffset: isNaN(circumference) ? 0 : circumference }}
          animate={{ strokeDashoffset: isNaN(offset) ? (isNaN(circumference) ? 0 : circumference) : offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={safeRadius}
          cx={safeSize / 2}
          cy={safeSize / 2}
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
  // 确保输入值有效
  const safeSize = isNaN(size) || size <= 0 ? 80 : size;
  const safeStrokeWidth = isNaN(strokeWidth) || strokeWidth <= 0 ? 8 : strokeWidth;
  
  const radius = (safeSize - safeStrokeWidth) / 2;
  const safeRadius = isNaN(radius) || radius <= 0 ? 1 : radius;
  const circumference = safeRadius * 2 * Math.PI;
  
  // 确保除数不为零
  const safeMaxValue = isNaN(maxValue) || maxValue === 0 ? 1 : maxValue;
  const safeValue = isNaN(value) || value < 0 ? 0 : Math.min(value, safeMaxValue);
  const progress = safeMaxValue === 0 ? 0 : Math.min(safeValue / safeMaxValue, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={safeSize} height={safeSize} className="-rotate-90">
        <circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={safeRadius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={safeStrokeWidth}
        />
        <motion.circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={safeRadius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={safeStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={isNaN(circumference) ? 0 : circumference}
          initial={{ strokeDashoffset: isNaN(circumference) ? 0 : circumference }}
          animate={{ strokeDashoffset: isNaN(offset) ? (isNaN(circumference) ? 0 : circumference) : offset }}
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
