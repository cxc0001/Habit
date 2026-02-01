import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'
import { generateId } from '@/lib/utils'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_KEY = 'microhabits_users'
const CURRENT_USER_KEY = 'microhabits_current_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUserId = localStorage.getItem(CURRENT_USER_KEY)
    if (savedUserId) {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[]
      const foundUser = users.find((u) => u.id === savedUserId)
      if (foundUser) {
        setUser(foundUser)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[]
    const foundUser = users.find((u) => u.email === email && u.password === password)
    
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem(CURRENT_USER_KEY, foundUser.id)
      return true
    }
    return false
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[]
    
    if (users.some((u) => u.email === email)) {
      return false
    }

    const newUser: User = {
      id: generateId(),
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      level: 1,
    }

    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    setUser(newUser)
    localStorage.setItem(CURRENT_USER_KEY, newUser.id)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
