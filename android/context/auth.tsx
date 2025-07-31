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
  checkAuthStatus: () => Promise<AuthSession | null>
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
      console.log('🔍 Checking auth status from HybridStorage...')
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

      return session
    } catch (error) {
      console.error('❌ Failed to check auth status:', error)
      setAuthSession(null)
      setIsVerified(false)
      return null
    }
  }

  const setUserVerified = async (userType: string) => {
    try {
      console.log('💾 Saving user verification to HybridStorage...')
      await hybridStorage.setUserVerified(userType)
      console.log('✅ User verification saved, refreshing auth status...')
      await checkAuthStatus() // Refresh auth session
    } catch (error) {
      console.error('❌ Failed to set user as verified:', error)
      throw error
    }
  }

  // Initial session check - happens once on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🚀 Initializing auth - checking stored session first...')

        // First check if we have a valid stored session
        const storedSession = await checkAuthStatus()

        if (storedSession && storedSession.isVerified) {
          console.log(
            '✅ Valid stored session found - user should be auto-logged in',
          )
          console.log('📊 Session details:', {
            userType: storedSession.userType,
            isVerified: storedSession.isVerified,
            expiresAt: new Date(storedSession.sessionExpiry).toLocaleString(),
          })
        } else {
          console.log('❌ No valid stored session found')
        }
      } catch (error) {
        console.error('❌ Failed to initialize auth:', error)
      }
    }

    initializeAuth()
  }, [])

  // Firebase auth state listener
  useEffect(() => {
    if (!auth) {
      setLoading(false)
      setIsInitialized(true)
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
          console.log('✅ Firebase user found, syncing with stored session...')
          // User is authenticated with Firebase, sync with stored session
          await checkAuthStatus()
        } else {
          console.log('❌ No Firebase user found')
          // Only clear stored session if we're sure the user logged out
          // (not on initial load where Firebase might just be slow)
          const storedSession = await hybridStorage.getAuthSession()
          if (!storedSession) {
            console.log(
              '💡 No stored session either - user is definitely logged out',
            )
            setIsVerified(false)
            setAuthSession(null)
          } else {
            console.log(
              '🤔 Firebase user missing but stored session exists - keeping session for now',
            )
          }
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
      // Clear HybridStorage first
      await hybridStorage.clearAuthSession()
      console.log('✅ HybridStorage cleared')

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
