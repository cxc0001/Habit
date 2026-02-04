import { motion, AnimatePresence } from 'framer-motion'
import { CelebrationData } from '@/types'
import { rarityColors, rarityBgColors, rarityLabels } from '@/data/rewards'
import { cn } from '@/lib/utils'

interface CelebrationModalProps {
  data: CelebrationData | null
  onClose: () => void
}

export function CelebrationModal({ data, onClose }: CelebrationModalProps) {
  if (!data) return null

  const { badge, isSeriesComplete, seriesName } = data

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* 背景遮罩 + 彩带效果 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
            onClick={onClose}
          >
            {/* 彩带粒子效果 */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9ff3'][i % 5],
                }}
                initial={{ top: '-10%', rotate: 0, scale: 0 }}
                animate={{
                  top: '110%',
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>

          {/* 弹窗内容 - 使用flex居中容器 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-full max-w-sm max-h-[90vh] overflow-y-auto"
            >
              <div className={cn(
                'rounded-3xl p-6 text-center relative overflow-hidden',
                isSeriesComplete ? 'bg-gradient-warm' : 'bg-card'
              )}>
                {/* 背景光效 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* 星星装饰 */}
                <motion.div
                  className="absolute top-4 left-4 text-2xl"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
                <motion.div
                  className="absolute top-4 right-4 text-2xl"
                  animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  ✨
                </motion.div>

                <div className="relative space-y-3">
                  {/* 标题 */}
                  <motion.h2
                    className={cn(
                      'text-xl md:text-2xl font-black',
                      isSeriesComplete ? 'text-white' : 'text-foreground'
                    )}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isSeriesComplete ? '🎉 系列完成!' : '🎊 获得徽章!'}
                  </motion.h2>

                  {/* 徽章展示 */}
                  {badge && (
                  <motion.div
                    className={cn(
                      'w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl md:rounded-3xl flex items-center justify-center border-4',
                      badge.rarity && rarityBgColors[badge.rarity as keyof typeof rarityBgColors],
                      badge.rarity && rarityBorderColors[badge.rarity as keyof typeof rarityBorderColors]
                    )}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  >
                    <motion.span
                      className="text-4xl md:text-5xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      {badge.emoji}
                    </motion.span>
                  </motion.div>
                  )}

                  {/* 徽章名称 */}
                  {badge && (
                  <motion.p
                    className={cn(
                      'text-lg md:text-xl font-bold',
                      isSeriesComplete ? 'text-white' : badge.rarity && rarityColors[badge.rarity as keyof typeof rarityColors]
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {badge.name}
                  </motion.p>
                  )}

                  {/* 稀有度标签 */}
                  {badge && (
                  <motion.span
                    className={cn(
                      'inline-block px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold',
                      (badge.rarity === 'legendary' ? 'bg-white/30 text-white' : badge.rarity && rarityBgColors[badge.rarity as keyof typeof rarityBgColors]),
                      (badge.rarity as keyof typeof rarityColors) !== 'legendary' && badge.rarity && rarityColors[badge.rarity as keyof typeof rarityColors]
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.6 }}
                  >
                    {badge.rarity && rarityLabels[badge.rarity as keyof typeof rarityLabels]}
                  </motion.span>
                  )}

                  {/* 系列信息 */}
                  <motion.p
                    className={cn(
                      'text-xs md:text-sm',
                      isSeriesComplete ? 'text-white/80' : 'text-muted-foreground'
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {seriesName}系列 {isSeriesComplete ? '全部收集完成!' : ''}
                  </motion.p>

                  {/* 关闭按钮 */}
                  <motion.button
                    onClick={onClose}
                    className={cn(
                      'px-6 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all',
                      isSeriesComplete
                        ? 'bg-white text-secondary hover:bg-white/90'
                        : 'btn-primary'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    太棒了!
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

const rarityBorderColors = {
  common: 'border-muted-foreground/30',
  uncommon: 'border-primary/50',
  rare: 'border-accent/50',
  legendary: 'border-white/50',
}