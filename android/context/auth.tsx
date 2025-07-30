import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth, onAuthStateChanged, User } from '@/lib/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { hybridStorage, AuthSession } from '@/lib/hybridStorage'

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
      console.log('🔍 Checking auth status from hybrid storage...')
      const session = await hybridStorage.getAuthSession()
      console.log('📦 Retrieved session:', {
        hasSession: !!session,
        isVerified: session?.isVerified,
        userType: session?.userType,
        expiryDate: session?.sessionExpiry
          ? new Date(session.sessionExpiry).toLocaleString()
          : null,
      })

      setAuthSession(session)
      setIsVerified(session?.isVerified === true)

      console.log('✅ Auth status updated:', {
        isVerified: session?.isVerified === true,
        hasSession: !!session,
      })
    } catch (error) {
      console.error('❌ Failed to check auth status:', error)
      setAuthSession(null)
      setIsVerified(false)
    }
  }

  const setUserVerified = async (userType: string) => {
    try {
      console.log('💾 Saving user verification to hybrid storage...')
      await hybridStorage.setUserVerified(userType)
      console.log('✅ User verification saved, refreshing auth status...')
      await checkAuthStatus() // Refresh auth session
    } catch (error) {
      console.error('❌ Failed to set user as verified:', error)
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
        console.log('🔥 Firebase auth state changed:', {
          isLoggedIn: !!firebaseUser,
          email: firebaseUser?.email,
        })

        setUser(firebaseUser)

        if (firebaseUser) {
          console.log('✅ Firebase user found, checking verification status...')
          // User is authenticated with Firebase, check verification status
          await checkAuthStatus()
        } else {
          console.log('❌ No Firebase user, clearing verification status...')
          // User is logged out, clear verification status
          setIsVerified(false)
          setAuthSession(null)
          await hybridStorage.clearAuthSession()
        }

        setLoading(false)
        setIsInitialized(true)
        console.log('🏁 Auth initialization complete')
      },
      (error) => {
        console.error('❌ Auth state change error:', error)
        setLoading(false)
        setIsInitialized(true)
      },
    )

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      console.log('🚪 Logging out user...')
      // Clear hybrid storage first
      await hybridStorage.clearAuthSession()
      console.log('✅ Hybrid storage cleared')

      // Sign out from Firebase
      await signOut(auth)
      console.log('✅ Firebase sign out complete')

      // Clear local state
      setIsVerified(false)
      setAuthSession(null)

      // The onAuthStateChanged will handle the rest
      router.replace('/(auth)/login')
    } catch (error) {
      console.error('❌ Logout error:', error)
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
