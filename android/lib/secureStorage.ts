import * as SecureStore from 'expo-secure-store'

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

class SecureStorageService {
  /**
   * Store user verification status after successful OTP verification
   */
  async setUserVerified(userType: string): Promise<void> {
    try {
      const timestamp = Date.now()
      const expiry = timestamp + SESSION_DURATION

      await Promise.all([
        SecureStore.setItemAsync(AUTH_KEYS.IS_VERIFIED, 'true'),
        SecureStore.setItemAsync(AUTH_KEYS.USER_TYPE, userType),
        SecureStore.setItemAsync(AUTH_KEYS.LOGIN_TIMESTAMP, timestamp.toString()),
        SecureStore.setItemAsync(AUTH_KEYS.SESSION_EXPIRY, expiry.toString()),
      ])
    } catch (error) {
      console.error('Failed to save verification status:', error)
      throw error
    }
  }

  /**
   * Check if user has a valid verified session
   */
  async getAuthSession(): Promise<AuthSession | null> {
    try {
      const [isVerified, userType, loginTimestamp, sessionExpiry] = await Promise.all([
        SecureStore.getItemAsync(AUTH_KEYS.IS_VERIFIED),
        SecureStore.getItemAsync(AUTH_KEYS.USER_TYPE),
        SecureStore.getItemAsync(AUTH_KEYS.LOGIN_TIMESTAMP),
        SecureStore.getItemAsync(AUTH_KEYS.SESSION_EXPIRY),
      ])

      if (!isVerified || !userType || !loginTimestamp || !sessionExpiry) {
        return null
      }

      const session: AuthSession = {
        isVerified: isVerified === 'true',
        userType,
        loginTimestamp: parseInt(loginTimestamp, 10),
        sessionExpiry: parseInt(sessionExpiry, 10),
      }

      // Check if session has expired
      if (session.sessionExpiry < Date.now()) {
        await this.clearAuthSession()
        return null
      }

      return session
    } catch (error) {
      console.error('Failed to get auth session:', error)
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
   * Clear all authentication data from secure storage
   */
  async clearAuthSession(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(AUTH_KEYS.IS_VERIFIED),
        SecureStore.deleteItemAsync(AUTH_KEYS.USER_TYPE),
        SecureStore.deleteItemAsync(AUTH_KEYS.LOGIN_TIMESTAMP),
        SecureStore.deleteItemAsync(AUTH_KEYS.SESSION_EXPIRY),
      ])

      console.log('Auth session cleared from secure storage')
    } catch (error) {
      console.error('Failed to clear auth session:', error)
      // Don't throw error as this might be called during logout
    }
  }

  /**
   * Extend current session expiry (useful for activity-based session extension)
   */
  async extendSession(): Promise<void> {
    try {
      const session = await this.getAuthSession()
      if (!session) {
        console.log('No session to extend')
        return
      }

      const newExpiry = Date.now() + SESSION_DURATION
      await SecureStore.setItemAsync(AUTH_KEYS.SESSION_EXPIRY, newExpiry.toString())

      console.log('Session extended successfully')
    } catch (error) {
      console.error('Failed to extend session:', error)
    }
  }

  /**
   * Get stored user type without validating session
   */
  async getUserType(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(AUTH_KEYS.USER_TYPE)
    } catch (error) {
      console.error('Failed to get user type:', error)
      return null
    }
  }
}

// Export singleton instance
export const secureStorage = new SecureStorageService()

// Export for testing
export { SecureStorageService } 