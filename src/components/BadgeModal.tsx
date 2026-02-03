import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Lock } from 'lucide-react'
import { useFarm } from '@/hooks/useFarm'
import { rarityColors, rarityBgColors, rarityBorderColors, rarityLabels, categoryInfo, seriesGroups, getRewardsBySeries } from '@/data/rewards'
import { cn } from '@/lib/utils'

interface BadgeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BadgeModal({ isOpen, onClose }: BadgeModalProps) {
  const { inventory, getSeriesBadges } = useFarm()

  const totalBadges = Object.values(seriesGroups).flat().reduce((sum, series) => {
    return sum + getRewardsBySeries(series).length
  }, 0)
  const unlockedBadges = inventory.badges.length

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:w-full md:max-w-2xl bg-card rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-5 border-b-2 border-dashed border-border">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-gradient-warm flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold">我的徽章</h2>
                  <p className="text-sm text-muted-foreground">
                    已收集 <span className="font-bold text-primary">{unlockedBadges}</span> / {totalBadges}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {(['plant', 'animal', 'cooking'] as const).map(category => {
                const info = categoryInfo[category]
                const series = seriesGroups[category]
                
                return (
                  <div key={category}>
                    <h3 className={cn('text-sm font-bold mb-3 flex items-center gap-2', info.color)}>
                      {info.emoji} {info.label}收获
                    </h3>
                    <div className="space-y-3">
                      {series.map(seriesName => {
                        const badges = getSeriesBadges(seriesName)
                        return (
                          <div key={seriesName} className="bg-muted/30 rounded-2xl p-3">
                            <p className="text-xs font-bold text-muted-foreground mb-2">{seriesName}系列</p>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                              {badges.map((badge, i) => (
                                <motion.div
                                  key={badge.name}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.03, type: "spring" }}
                                  className={cn(
                                    'relative p-2 rounded-xl border-2 text-center transition-all',
                                    badge.unlocked 
                                      ? cn(rarityBgColors[badge.rarity as keyof typeof rarityBgColors], rarityBorderColors[badge.rarity as keyof typeof rarityBorderColors])
                                      : 'bg-muted/50 border-muted-foreground/20'
                                  )}
                                >
                                  {badge.unlocked ? (
                                    <>
                                      <motion.div 
                                        className="text-2xl mb-0.5"
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                      >
                                        {badge.emoji}
                                      </motion.div>
                                      <p className={cn('text-xs font-bold truncate', rarityColors[badge.rarity as keyof typeof rarityColors])}>
                                        {badge.name}
                                      </p>
                                      
                                      {/* Rarity indicator */}
                                      <div className={cn(
                                        'absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs',
                                        badge.rarity === 'legendary' && 'bg-gradient-warm text-white',
                                        badge.rarity === 'rare' && 'bg-accent text-white',
                                        badge.rarity === 'uncommon' && 'bg-primary text-white',
                                        badge.rarity === 'common' && 'bg-muted-foreground text-white'
                                      )}>
                                        {badge.rarity === 'legendary' ? '★' : 
                                         badge.rarity === 'rare' ? '◆' :
                                         badge.rarity === 'uncommon' ? '●' : '○'}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="text-2xl mb-0.5 grayscale opacity-30">
                                        <Lock className="w-5 h-5 mx-auto" />
                                      </div>
                                      <p className="text-xs text-muted-foreground font-medium">???</p>
                                      <p className="text-xs text-muted-foreground/50">
                                        {rarityLabels[badge.rarity as keyof typeof rarityLabels]}
                                      </p>
                                    </>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {/* Legend */}
              <div className="p-4 bg-muted/30 rounded-2xl">
                <p className="text-xs font-bold text-muted-foreground mb-2">稀有度说明</p>
                <div className="flex flex-wrap gap-3">
                  {(['common', 'uncommon', 'rare', 'legendary'] as const).map(rarity => (
                    <div key={rarity} className="flex items-center gap-1">
                      <span className={cn(
                        'w-4 h-4 rounded-full flex items-center justify-center text-xs text-white',
                        rarity === 'legendary' && 'bg-gradient-warm',
                        rarity === 'rare' && 'bg-accent',
                        rarity === 'uncommon' && 'bg-primary',
                        rarity === 'common' && 'bg-muted-foreground'
                      )}>
                        {rarity === 'legendary' ? '★' : 
                         rarity === 'rare' ? '◆' :
                         rarity === 'uncommon' ? '●' : '○'}
                      </span>
                      <span className="text-xs text-muted-foreground">{rarityLabels[rarity]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
