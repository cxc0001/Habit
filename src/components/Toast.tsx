import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/context/ToastContext'
import { X, CheckCircle, AlertCircle, Info, Gift } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  reward: Gift,
}

const styles = {
  success: 'bg-success/15 border-success/40 text-success',
  error: 'bg-destructive/15 border-destructive/40 text-destructive',
  info: 'bg-accent/15 border-accent/40 text-accent',
  reward: 'bg-gradient-warm border-secondary/40 text-secondary-foreground',
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-2xl border-2 shadow-cute backdrop-blur-xl min-w-[280px]',
                styles[toast.type]
              )}
            >
              <motion.div
                animate={toast.type === 'reward' ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : undefined}
                transition={{ duration: 0.5, repeat: toast.type === 'reward' ? 3 : 0 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
              </motion.div>
              <p className="text-sm font-bold flex-1">{toast.message}</p>
              <motion.button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-foreground/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
