import AsyncStorage from '@react-native-async-storage/async-storage'

// Keys for storing authentication data
const AUTH_KEYS = {
  IS_VERIFIED: 'user_verified',
  USER_TYPE: 'user_type',
  LOGIN_TIMESTAMP: 'login_timestamp',
  SESSION_EXPIRY: 'session_expiry',
} as const

// Session duration (in milliseconds) - 30 days
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000

export interface AuthSession {
  isVerified: boolean
  userType?: string
  loginTimestamp: number
  sessionExpiry: number
}

class AsyncStorageService {
  /**
   * Store user verification status after successful OTP verification
   */
  async setUserVerified(userType: string): Promise<void> {
    try {
      const timestamp = Date.now()
      const expiry = timestamp + SESSION_DURATION

      await AsyncStorage.multiSet([
        [AUTH_KEYS.IS_VERIFIED, 'true'],
        [AUTH_KEYS.USER_TYPE, userType],
        [AUTH_KEYS.LOGIN_TIMESTAMP, timestamp.toString()],
        [AUTH_KEYS.SESSION_EXPIRY, expiry.toString()],
      ])

      console.log('✅ Verification saved to AsyncStorage')
    } catch (error) {
      console.error('❌ Failed to save verification:', error)
      throw error
    }
  }

  /**
   * Check if user has a valid verified session
   */
  async getAuthSession(): Promise<AuthSession | null> {
    try {
      const keys = [
        AUTH_KEYS.IS_VERIFIED,
        AUTH_KEYS.USER_TYPE,
        AUTH_KEYS.LOGIN_TIMESTAMP,
        AUTH_KEYS.SESSION_EXPIRY,
      ]

      const values = await AsyncStorage.multiGet(keys)
      const data = Object.fromEntries(values)

      const isVerified = data[AUTH_KEYS.IS_VERIFIED]
      const userType = data[AUTH_KEYS.USER_TYPE]
      const loginTimestamp = data[AUTH_KEYS.LOGIN_TIMESTAMP]
      const sessionExpiry = data[AUTH_KEYS.SESSION_EXPIRY]

      if (!isVerified || !userType || !loginTimestamp || !sessionExpiry) {
        return null
      }

      const session: AuthSession = {
        isVerified: isVerified === 'true',
        userType: userType === 'User' ? 'User' : 'Administrator',
        loginTimestamp: parseInt(loginTimestamp, 10),
        sessionExpiry: parseInt(sessionExpiry, 10),
      }

      // Check if session has expired
      if (session.sessionExpiry < Date.now()) {
        await this.clearAuthSession()
        return null
      }

      console.log('✅ Valid session found in AsyncStorage')
      return session
    } catch (error) {
      console.error('❌ Failed to get auth session:', error)
      return null
    }
  }

  /**
   * Check if user is verified and session is valid
   */
  async isUserVerified(): Promise<boolean> {
    const session = await this.getAuthSession()
    return session?.isVerified === true
  }

  /**
   * Clear all authentication data
   */
  async clearAuthSession(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        AUTH_KEYS.IS_VERIFIED,
        AUTH_KEYS.USER_TYPE,
        AUTH_KEYS.LOGIN_TIMESTAMP,
        AUTH_KEYS.SESSION_EXPIRY,
      ])
      console.log('✅ Auth session cleared from AsyncStorage')
    } catch (error) {
      console.error('❌ Failed to clear auth session:', error)
    }
  }

  /**
   * Extend current session expiry
   */
  async extendSession(): Promise<void> {
    try {
      const session = await this.getAuthSession()
      if (!session) return

      const newExpiry = Date.now() + SESSION_DURATION
      await AsyncStorage.setItem(AUTH_KEYS.SESSION_EXPIRY, newExpiry.toString())
    } catch (error) {
      console.error('Failed to extend session:', error)
    }
  }

  /**
   * Get stored user type without validating session
   */
  async getUserType(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_KEYS.USER_TYPE)
    } catch (error) {
      console.error('Failed to get user type:', error)
      return null
    }
  }
}

// Export singleton instance
export const asyncStorage = new AsyncStorageService()

// Export for testing
export { AsyncStorageService } 