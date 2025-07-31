import * as SecureStore from 'expo-secure-store'

// Keys for storing authentication data
const AUTH_KEYS = {
  IS_VERIFIED: 'user_verified',
  USER_TYPE: 'user_type',
  USER_ID: 'user_id',
  LOGIN_TIMESTAMP: 'login_timestamp',
  SESSION_EXPIRY: 'session_expiry',
} as const

// Session duration (in milliseconds) - 30 days
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000

export interface AuthSession {
  isVerified: boolean
  userType?: string
  userId?: string
  loginTimestamp: number
  sessionExpiry: number
}

class SecureStorageService {
  /**
   * Store user verification status after successful OTP verification
   */
  async setUserVerified(userType: string, userId: string): Promise<void> {
    try {
      const timestamp = Date.now()
      const expiry = timestamp + SESSION_DURATION

      console.log('💾 SAVING VERIFICATION DATA TO SECURE STORAGE')
      console.log('Data to save:', {
        userType,
        userId,
        timestamp: new Date(timestamp).toLocaleString(),
        expiry: new Date(expiry).toLocaleString(),
        sessionDurationDays: SESSION_DURATION / (24 * 60 * 60 * 1000),
      })

      await Promise.all([
        SecureStore.setItemAsync(AUTH_KEYS.IS_VERIFIED, 'true'),
        SecureStore.setItemAsync(AUTH_KEYS.USER_TYPE, userType),
        SecureStore.setItemAsync(AUTH_KEYS.USER_ID, userId),
        SecureStore.setItemAsync(AUTH_KEYS.LOGIN_TIMESTAMP, timestamp.toString()),
        SecureStore.setItemAsync(AUTH_KEYS.SESSION_EXPIRY, expiry.toString()),
      ])

      console.log('✅ ALL VERIFICATION DATA SAVED SUCCESSFULLY')

      // Verify the data was saved by reading it back
      const verification = await Promise.all([
        SecureStore.getItemAsync(AUTH_KEYS.IS_VERIFIED),
        SecureStore.getItemAsync(AUTH_KEYS.USER_TYPE),
        SecureStore.getItemAsync(AUTH_KEYS.USER_ID),
        SecureStore.getItemAsync(AUTH_KEYS.LOGIN_TIMESTAMP),
        SecureStore.getItemAsync(AUTH_KEYS.SESSION_EXPIRY),
      ])

      console.log('🔍 VERIFICATION - Data read back:', {
        isVerified: verification[0],
        userType: verification[1],
        userId: verification[2],
        loginTimestamp: verification[3],
        sessionExpiry: verification[4],
      })
    } catch (error) {
      console.error('❌ FAILED TO SAVE VERIFICATION STATUS:', error)
      throw error
    }
  }

  /**
   * Check if user has a valid verified session
   */
  async getAuthSession(): Promise<AuthSession | null> {
    try {
      console.log('📖 READING AUTH SESSION FROM SECURE STORAGE')

      const [isVerified, userType, userId, loginTimestamp, sessionExpiry] = await Promise.all([
        SecureStore.getItemAsync(AUTH_KEYS.IS_VERIFIED),
        SecureStore.getItemAsync(AUTH_KEYS.USER_TYPE),
        SecureStore.getItemAsync(AUTH_KEYS.USER_ID),
        SecureStore.getItemAsync(AUTH_KEYS.LOGIN_TIMESTAMP),
        SecureStore.getItemAsync(AUTH_KEYS.SESSION_EXPIRY),
      ])

      console.log('📦 Raw data from secure storage:', {
        isVerified,
        userType,
        userId,
        loginTimestamp,
        sessionExpiry,
      })

      if (!isVerified || !userType || !userId || !loginTimestamp || !sessionExpiry) {
        console.log('❌ INCOMPLETE SESSION DATA - some values are missing')
        return null
      }

      const session: AuthSession = {
        isVerified: isVerified === 'true',
        userType,
        userId,
        loginTimestamp: parseInt(loginTimestamp, 10),
        sessionExpiry: parseInt(sessionExpiry, 10),
      }

      console.log('🔍 PARSED SESSION DATA:', {
        isVerified: session.isVerified,
        userType: session.userType,
        userId: session.userId,
        loginTimestamp: new Date(session.loginTimestamp).toLocaleString(),
        sessionExpiry: new Date(session.sessionExpiry).toLocaleString(),
        isExpired: session.sessionExpiry < Date.now(),
        daysUntilExpiry: Math.ceil((session.sessionExpiry - Date.now()) / (24 * 60 * 60 * 1000)),
      })

      // Check if session has expired
      if (session.sessionExpiry < Date.now()) {
        console.log('⏰ SESSION HAS EXPIRED - clearing session')
        await this.clearAuthSession()
        return null
      }

      console.log('✅ VALID SESSION FOUND')
      return session
    } catch (error) {
      console.error('❌ FAILED TO GET AUTH SESSION:', error)
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
      await Promise.all([
        SecureStore.deleteItemAsync(AUTH_KEYS.IS_VERIFIED),
        SecureStore.deleteItemAsync(AUTH_KEYS.USER_TYPE),
        SecureStore.deleteItemAsync(AUTH_KEYS.USER_ID),
        SecureStore.deleteItemAsync(AUTH_KEYS.LOGIN_TIMESTAMP),
        SecureStore.deleteItemAsync(AUTH_KEYS.SESSION_EXPIRY),
      ])
      console.log('✅ Auth session cleared from SecureStore')
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
      await SecureStore.setItemAsync(AUTH_KEYS.SESSION_EXPIRY, newExpiry.toString())
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