import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Habit } from '@/types'

const EMOJI_OPTIONS = ['📚', '🏃', '💪', '🧘', '💧', '🍎', '😴', '✍️', '🎯', '🌟', '💻', '🎨', '🎵', '🧹', '💊', '🌅']

interface HabitFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, description: string, icon: string, color: string) => void
  habit?: Habit | null
}

export function HabitFormModal({ isOpen, onClose, onSubmit, habit }: HabitFormModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('📚')

  useEffect(() => {
    if (habit) {
      setName(habit.name)
      setDescription(habit.description)
      setIcon(habit.icon)
    } else {
      setName('')
      setDescription('')
      setIcon('📚')
    }
  }, [habit, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name.trim(), description.trim(), icon, '')
    onClose()
  }

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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:w-full md:max-w-md bg-card rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b-2 border-dashed border-border">
              <h2 className="text-lg font-black flex items-center gap-2">
                {habit ? '✏️ 编辑习惯' : '✨ 添加新习惯'}
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-xl transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              <div>
                <label className="block text-sm font-bold mb-3">选择图标</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map((emoji, i) => (
                    <motion.button
                      key={emoji}
                      type="button"
                      onClick={() => setIcon(emoji)}
                      className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition-all border-2 ${
                        icon === emoji
                          ? 'bg-primary/20 border-primary shadow-cute'
                          : 'bg-muted/50 border-transparent hover:bg-muted'
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">习惯名称</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例如: 每天阅读30分钟"
                  className="input-field"
                  maxLength={50}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">描述 (可选)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="为什么这个习惯对你很重要?"
                  className="input-field min-h-[80px] resize-none"
                  maxLength={200}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  取消
                </motion.button>
                <motion.button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={!name.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {habit ? '保存' : '添加'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
