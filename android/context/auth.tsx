import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth, onAuthStateChanged, User } from '@/lib/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'

type ContextProps = {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<Partial<ContextProps>>({})

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        console.log(
          'Auth state changed:',
          firebaseUser ? 'User logged in' : 'User logged out',
        )
        setUser(firebaseUser)
        setLoading(false)
      },
      (error) => {
        console.error('Auth state change error:', error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      // The onAuthStateChanged will handle the state update
      router.replace('/(auth)/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
