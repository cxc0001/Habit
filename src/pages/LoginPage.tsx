import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        const result = await login(username, password)
        if (result.success) {
          addToast('欢迎回来! 🎉', 'success')
          navigate('/')
        } else {
          addToast(result.message || '用户名或密码错误', 'error')
        }
      } else {
        if (!username.trim()) {
          addToast('请输入用户名', 'error')
          return
        }
        const result = await register(username, password)
        if (result.success) {
          addToast('注册成功! 开始你的习惯之旅吧 🌱', 'success')
          navigate('/')
        } else {
          addToast(result.message || '该用户名已被注册', 'error')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-cute-pink/10 relative overflow-hidden">
      {/* 装饰元素 */}
      <motion.div
        className="absolute top-20 left-10 text-6xl"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌱
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-5xl"
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        🌻
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20 text-4xl"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      >
        🐤
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-5xl"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
      >
        🍰
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-3xl bg-gradient-primary mx-auto flex items-center justify-center shadow-cute-lg relative"
          >
            <span className="text-5xl">🌱</span>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-secondary" />
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-4xl font-black mt-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            微习惯
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            每天一小步，成就大改变 ✨
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          className="glass-card rounded-3xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex mb-6 bg-muted/50 rounded-2xl p-1">
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-center font-bold rounded-xl transition-all ${
                isLogin ? 'bg-card text-primary shadow-cute' : 'text-muted-foreground'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              登录
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-center font-bold rounded-xl transition-all ${
                !isLogin ? 'bg-card text-primary shadow-cute' : 'text-muted-foreground'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              注册
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">用户名</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="输入你的昵称"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  {isLogin ? '登录' : '注册'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          种下习惯的种子，收获美好的未来 🌟
        </motion.p>
      </motion.div>
    </div>
  )
}
