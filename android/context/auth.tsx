import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth, onAuthStateChanged, User } from '@/lib/firestore'
import { useRouter } from 'expo-router'
import { hybridStorage, AuthSession } from '@/lib/hybridStorage'
import { UserType } from '@/utils/types'
import { logToDiscord } from '@/utils/discordLogger'

type ContextProps = {
  user: User | null
  loading: boolean
  isVerified: boolean
  authSession: AuthSession | null
  isInitialized: boolean
  checkAuthStatus: () => Promise<AuthSession | null>
  setUserVerified: (userType: string) => Promise<void>
  logout: () => Promise<void>
  clearInvalidSession: () => Promise<void>
  getUserId: () => string | undefined
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
      logToDiscord.log(
        '🔍 Checking auth status from HybridStorage...',
        'auth.tsx',
        'checkAuthStatus',
      )
      const session = await hybridStorage.getAuthSession()
      logToDiscord.log(
        `📦 Retrieved session: hasSession=${!!session}, isVerified=${session?.isVerified}, userType=${session?.userType}, userId=${session?.userId}, expiryDate=${session?.sessionExpiry ? new Date(session.sessionExpiry).toLocaleString() : null}`,
        'auth.tsx',
        'checkAuthStatus',
      )

      setAuthSession(session)
      setIsVerified(session?.isVerified === true)

      logToDiscord.log(
        `✅ Auth status updated: isVerified=${session?.isVerified === true}, hasSession=${!!session}, userId=${session?.userId}`,
        'auth.tsx',
        'checkAuthStatus',
      )

      return session
    } catch (error) {
      logToDiscord.error(
        `❌ Failed to check auth status: ${error}`,
        'auth.tsx',
        'checkAuthStatus',
      )
      setAuthSession(null)
      setIsVerified(false)
      return null
    }
  }

  const setUserVerified = async (userType: string) => {
    try {
      logToDiscord.log(
        '💾 Saving user verification to HybridStorage...',
        'auth.tsx',
        'setUserVerified',
      )
      logToDiscord.log(
        `📋 User type being saved: ${userType}`,
        'auth.tsx',
        'setUserVerified',
      )
      logToDiscord.log(
        `📋 User type typeof: ${typeof userType}`,
        'auth.tsx',
        'setUserVerified',
      )

      if (!user?.uid) {
        throw new Error('Firebase user not available for saving verification')
      }

      // Validate that the userType is a valid UserType enum value
      const validUserTypes = Object.values(UserType)
      if (!validUserTypes.includes(userType as UserType)) {
        logToDiscord.warn(
          `⚠️ Invalid user type provided: ${userType}`,
          'auth.tsx',
          'setUserVerified',
        )
        logToDiscord.warn(
          `⚠️ Valid types are: ${validUserTypes.join(', ')}`,
          'auth.tsx',
          'setUserVerified',
        )
        throw new Error(`Invalid user type: ${userType}`)
      }

      await hybridStorage.setUserVerified(userType, user.uid)
      logToDiscord.log(
        '✅ User verification saved, refreshing auth status...',
        'auth.tsx',
        'setUserVerified',
      )
      await checkAuthStatus() // Refresh auth session
    } catch (error) {
      logToDiscord.error(
        `❌ Failed to set user as verified: ${error}`,
        'auth.tsx',
        'setUserVerified',
      )
      throw error
    }
  }

  // Initial session check - happens once on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        logToDiscord.log(
          '🚀 Initializing auth - checking stored session first...',
          'auth.tsx',
          'initializeAuth',
        )

        // First check if we have a valid stored session
        const storedSession = await checkAuthStatus()

        if (storedSession && storedSession.isVerified) {
          logToDiscord.log(
            '✅ Valid stored session found - user should be auto-logged in',
            'auth.tsx',
            'initializeAuth',
          )
          logToDiscord.log(
            `📊 Session details: userType=${storedSession.userType}, userId=${storedSession.userId}, isVerified=${storedSession.isVerified}, expiresAt=${new Date(storedSession.sessionExpiry).toLocaleString()}`,
            'auth.tsx',
            'initializeAuth',
          )
        } else {
          logToDiscord.log(
            '❌ No valid stored session found',
            'auth.tsx',
            'initializeAuth',
          )
        }
      } catch (error) {
        logToDiscord.error(
          `❌ Failed to initialize auth: ${error}`,
          'auth.tsx',
          'initializeAuth',
        )
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
        logToDiscord.log(
          `🔥 Firebase auth state changed: isLoggedIn=${!!firebaseUser}, email=${firebaseUser?.email}, uid=${firebaseUser?.uid}`,
          'auth.tsx',
          'onAuthStateChanged',
        )

        setUser(firebaseUser)

        if (firebaseUser) {
          logToDiscord.log(
            '✅ Firebase user found, syncing with stored session...',
            'auth.tsx',
            'onAuthStateChanged',
          )
          // User is authenticated with Firebase, sync with stored session
          await checkAuthStatus()
        } else {
          logToDiscord.log(
            '❌ No Firebase user found',
            'auth.tsx',
            'onAuthStateChanged',
          )
          // Only clear stored session if we're sure the user logged out
          // (not on initial load where Firebase might just be slow)
          const storedSession = await hybridStorage.getAuthSession()
          if (!storedSession) {
            logToDiscord.log(
              '💡 No stored session either - user is definitely logged out',
              'auth.tsx',
              'onAuthStateChanged',
            )
            setIsVerified(false)
            setAuthSession(null)
          } else {
            logToDiscord.log(
              '🤔 Firebase user missing but stored session exists - keeping session for now',
              'auth.tsx',
              'onAuthStateChanged',
            )
          }
        }

        setLoading(false)
        setIsInitialized(true)
        logToDiscord.log(
          '🏁 Auth initialization complete',
          'auth.tsx',
          'onAuthStateChanged',
        )
      },
      (error) => {
        logToDiscord.error(
          `❌ Auth state change error: ${error}`,
          'auth.tsx',
          'onAuthStateChanged',
        )
        setLoading(false)
        setIsInitialized(true)
      },
    )

    return () => unsubscribe()
  }, [])

  const getUserId = () => {
    // Prioritize session user ID for auto-login scenarios
    if (authSession?.userId) {
      return authSession.userId
    }
    // Fallback to Firebase user ID
    return user?.uid
  }

  const logout = async () => {
    try {
      logToDiscord.log('🚪 Logging out user...', 'auth.tsx', 'logout')
      await auth?.signOut()
      await hybridStorage.clearAuthSession()
      setUser(null)
      setIsVerified(false)
      setAuthSession(null)
      logToDiscord.log('✅ Logout successful', 'auth.tsx', 'logout')
    } catch (error) {
      logToDiscord.error(`❌ Logout error: ${error}`, 'auth.tsx', 'logout')
      throw error
    }
  }

  const clearInvalidSession = async () => {
    try {
      logToDiscord.log(
        '🧹 Clearing invalid session data...',
        'auth.tsx',
        'clearInvalidSession',
      )
      await hybridStorage.clearAuthSession()
      setIsVerified(false)
      setAuthSession(null)
      logToDiscord.log(
        '✅ Invalid session cleared',
        'auth.tsx',
        'clearInvalidSession',
      )
    } catch (error) {
      logToDiscord.error(
        `❌ Failed to clear invalid session: ${error}`,
        'auth.tsx',
        'clearInvalidSession',
      )
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
        setUserVerified,
        logout,
        clearInvalidSession,
        getUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
