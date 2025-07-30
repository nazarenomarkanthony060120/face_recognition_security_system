import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth, onAuthStateChanged, User } from '@/lib/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { secureStorage, AuthSession } from '@/lib/secureStorage'

type ContextProps = {
  user: User | null
  loading: boolean
  isVerified: boolean
  authSession: AuthSession | null
  isInitialized: boolean
  checkAuthStatus: () => Promise<void>
  setUserVerified: (userType: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<Partial<ContextProps>>({})

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [authSession, setAuthSession] = useState<AuthSession | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  const checkAuthStatus = async () => {
    try {
      const session = await secureStorage.getAuthSession()
      setAuthSession(session)
      setIsVerified(session?.isVerified === true)
    } catch (error) {
      console.error('Failed to check auth status:', error)
      setAuthSession(null)
      setIsVerified(false)
    }
  }

  const setUserVerified = async (userType: string) => {
    try {
      await secureStorage.setUserVerified(userType)
      await checkAuthStatus() // Refresh auth session
    } catch (error) {
      console.error('Failed to set user as verified:', error)
      throw error
    }
  }

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        setUser(firebaseUser)

        if (firebaseUser) {
          // User is authenticated with Firebase, check verification status
          await checkAuthStatus()
        } else {
          // User is logged out, clear verification status
          setIsVerified(false)
          setAuthSession(null)
          await secureStorage.clearAuthSession()
        }

        setLoading(false)
        setIsInitialized(true)
      },
      (error) => {
        console.error('Auth state change error:', error)
        setLoading(false)
        setIsInitialized(true)
      },
    )

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      // Clear secure storage first
      await secureStorage.clearAuthSession()

      // Sign out from Firebase
      await signOut(auth)

      // Clear local state
      setIsVerified(false)
      setAuthSession(null)

      // The onAuthStateChanged will handle the rest
      router.replace('/(auth)/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isVerified,
        authSession,
        isInitialized,
        checkAuthStatus,
        setUserVerified,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
