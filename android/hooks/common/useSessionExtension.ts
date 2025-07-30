import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useAuth } from '@/context/auth'
import { secureStorage } from '@/lib/secureStorage'

/**
 * Hook to automatically extend user session when app is active
 * This helps maintain login state for active users
 */
export const useSessionExtension = () => {
  const { user, isVerified } = useAuth()
  const appState = useRef(AppState.currentState)
  const lastExtensionTime = useRef(0)

  // Minimum time between session extensions (15 minutes)
  const EXTENSION_INTERVAL = 15 * 60 * 1000

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      const now = Date.now()

      // Only extend session when:
      // 1. User is authenticated and verified
      // 2. App becomes active
      // 3. Enough time has passed since last extension
      if (
        user &&
        isVerified &&
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        now - lastExtensionTime.current > EXTENSION_INTERVAL
      ) {
        try {
          await secureStorage.extendSession()
          lastExtensionTime.current = now
          console.log('Session extended automatically')
        } catch (error) {
          console.error('Failed to extend session:', error)
        }
      }

      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription?.remove()
    }
  }, [user, isVerified])
}

/**
 * Hook for manual session extension (can be called on user activity)
 */
export const useManualSessionExtension = () => {
  const { user, isVerified } = useAuth()

  const extendSession = async () => {
    if (!user || !isVerified) {
      console.log('Cannot extend session: user not authenticated or verified')
      return false
    }

    try {
      await secureStorage.extendSession()
      console.log('Session extended manually')
      return true
    } catch (error) {
      console.error('Failed to extend session manually:', error)
      return false
    }
  }

  return extendSession
} 