import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Settings, LogOut, User, Sprout, BarChart3 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

export function Navigation() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/', icon: Home, label: '打卡' },
    { to: '/reports', icon: BarChart3, label: '统计' },
    { to: '/manage', icon: Settings, label: '管理' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto bg-card/80 backdrop-blur-xl border-t md:border-t-0 md:border-b border-border z-40">
      <div className="max-w-4xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Desktop only */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">微习惯</span>
          </div>

          {/* Nav Items - Average distribution on mobile */}
          <div className="flex items-center justify-between md:justify-center gap-0 flex-1 md:flex-initial">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex flex-col items-center gap-1 flex-1 py-1.5 md:px-6 md:py-2 rounded-xl transition-all min-h-[48px]',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )
                  }
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{user?.username}</span>
              <span className="text-xs text-primary font-medium">Lv.{user?.level}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="退出登录"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
