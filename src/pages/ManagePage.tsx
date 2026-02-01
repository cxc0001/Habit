import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, ArrowLeft, Sparkles } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { HabitFormModal } from '@/components/HabitFormModal'
import { useHabits } from '@/hooks/useHabits'
import { useToast } from '@/context/ToastContext'
import { Habit } from '@/types'
import { Link } from 'react-router-dom'

export function ManagePage() {
  const { habits, addHabit, updateHabit, deleteHabit } = useHabits()
  const { addToast } = useToast()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)

  const handleFormSubmit = (name: string, description: string, icon: string, color: string) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, { name, description, icon, color })
      addToast('习惯已更新 ✨', 'success')
    } else {
      addHabit(name, description, icon, color)
      addToast('新习惯已添加! 🎉', 'success')
    }
    setEditingHabit(null)
  }

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit)
    setIsFormOpen(true)
  }

  const handleDelete = (habit: Habit) => {
    if (confirm(`确定要删除"${habit.name}"吗? 相关的打卡记录也会被删除。`)) {
      deleteHabit(habit.id)
      addToast('习惯已删除', 'info')
    }
  }

  return (
    <div className="min-h-screen pb-24 md:pt-20 bg-gradient-to-b from-background to-accent/5">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 hover:bg-muted rounded-xl transition-all md:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2">
                <span className="text-2xl">⚙️</span> 习惯管理
              </h1>
              <p className="text-muted-foreground text-sm font-medium">
                添加、编辑或删除你的微习惯
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => {
              setEditingHabit(null)
              setIsFormOpen(true)
            }}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">添加习惯</span>
          </motion.button>
        </div>

        {/* Habits List */}
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-10 text-center"
          >
            <motion.div
              className="w-24 h-24 rounded-3xl bg-gradient-cute mx-auto flex items-center justify-center mb-6 shadow-cute"
              animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Plus className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="font-black text-xl mb-2">还没有习惯</h3>
            <p className="text-muted-foreground text-sm mb-6 font-medium">
              添加你想要培养的微习惯，开始你的成长之旅吧!
            </p>
            <motion.button
              onClick={() => {
                setEditingHabit(null)
                setIsFormOpen(true)
              }}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              添加第一个习惯
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {habits.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                  className="glass-card rounded-2xl p-4"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-muted/80 flex items-center justify-center text-3xl"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      {habit.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate">{habit.name}</h3>
                      {habit.description && (
                        <p className="text-sm text-muted-foreground truncate font-medium">
                          {habit.description}
                        </p>
                      )}
                      <p className="text-xs text-primary font-bold mt-1">
                        每次打卡
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => handleEdit(habit)}
                        className="p-3 hover:bg-primary/10 rounded-xl transition-all"
                        title="编辑"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Pencil className="w-5 h-5 text-primary" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(habit)}
                        className="p-3 hover:bg-destructive/10 rounded-xl transition-all"
                        title="删除"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-5 bg-gradient-primary/10 rounded-3xl border-2 border-dashed border-primary/30"
        >
          <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> 小贴士
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              微习惯应该足够小，小到几乎不可能失败
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              从2-3个习惯开始，逐步增加
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              把习惯和固定的时间或场景绑定
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              每次打卡都能获得积分，用来培养作物、动物或制作美食!
            </li>
          </ul>
        </motion.div>
      </main>

      {/* Form Modal */}
      <HabitFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingHabit(null)
        }}
        onSubmit={handleFormSubmit}
        habit={editingHabit}
      />
    </div>
  )
}
