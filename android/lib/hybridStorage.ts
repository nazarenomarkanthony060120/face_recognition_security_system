import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

class HybridStorageService {
  private useSecureStore = true

  /**
   * Store an item using SecureStore first, fallback to AsyncStorage
   */
  private async setItem(key: string, value: string): Promise<void> {
    try {
      if (this.useSecureStore) {
        await SecureStore.setItemAsync(key, value)
        console.log(`✅ Saved to SecureStore: ${key}`)
      } else {
        await AsyncStorage.setItem(key, value)
        console.log(`✅ Saved to AsyncStorage: ${key}`)
      }
    } catch (error) {
      if (this.useSecureStore) {
        console.log(`⚠️ SecureStore failed for ${key}, trying AsyncStorage...`)
        try {
          await AsyncStorage.setItem(key, value)
          console.log(`✅ Saved to AsyncStorage (fallback): ${key}`)
        } catch (fallbackError) {
          console.error(`❌ Both SecureStore and AsyncStorage failed for ${key}:`, fallbackError)
          throw fallbackError
        }
      } else {
        throw error
      }
    }
  }

  /**
   * Get an item using SecureStore first, fallback to AsyncStorage
   */
  private async getItem(key: string): Promise<string | null> {
    try {
      if (this.useSecureStore) {
        const value = await SecureStore.getItemAsync(key)
        if (value !== null) {
          console.log(`📖 Read from SecureStore: ${key}`)
          return value
        }

        // If not found in SecureStore, try AsyncStorage
        console.log(`🔄 Not found in SecureStore, trying AsyncStorage: ${key}`)
        const asyncValue = await AsyncStorage.getItem(key)
        if (asyncValue !== null) {
          console.log(`📖 Found in AsyncStorage: ${key}`)
        }
        return asyncValue
      } else {
        const value = await AsyncStorage.getItem(key)
        console.log(`📖 Read from AsyncStorage: ${key}`)
        return value
      }
    } catch (error) {
      if (this.useSecureStore) {
        console.log(`⚠️ SecureStore failed for ${key}, trying AsyncStorage...`)
        try {
          const value = await AsyncStorage.getItem(key)
          console.log(`📖 Read from AsyncStorage (fallback): ${key}`)
          return value
        } catch (fallbackError) {
          console.error(`❌ Both SecureStore and AsyncStorage failed for ${key}:`, fallbackError)
          return null
        }
      } else {
        console.error(`❌ AsyncStorage failed for ${key}:`, error)
        return null
      }
    }
  }

  /**
   * Delete an item from both SecureStore and AsyncStorage
   */
  private async deleteItem(key: string): Promise<void> {
    try {
      await Promise.allSettled([
        SecureStore.deleteItemAsync(key),
        AsyncStorage.removeItem(key)
      ])
      console.log(`🗑️ Deleted from both storages: ${key}`)
    } catch (error) {
      console.error(`❌ Failed to delete ${key}:`, error)
    }
  }

  /**
   * Store user verification status after successful OTP verification
   */
  async setUserVerified(userType: string, userId: string): Promise<void> {
    try {
      const timestamp = Date.now()
      const expiry = timestamp + SESSION_DURATION

      console.log('💾 SAVING VERIFICATION DATA TO HYBRID STORAGE')
      console.log('Storage method:', this.useSecureStore ? 'SecureStore (primary)' : 'AsyncStorage (fallback)')
      console.log('Data to save:', {
        userType,
        userId,
        timestamp: new Date(timestamp).toLocaleString(),
        expiry: new Date(expiry).toLocaleString(),
        sessionDurationDays: SESSION_DURATION / (24 * 60 * 60 * 1000),
      })

      await Promise.all([
        this.setItem(AUTH_KEYS.IS_VERIFIED, 'true'),
        this.setItem(AUTH_KEYS.USER_TYPE, userType),
        this.setItem(AUTH_KEYS.USER_ID, userId),
        this.setItem(AUTH_KEYS.LOGIN_TIMESTAMP, timestamp.toString()),
        this.setItem(AUTH_KEYS.SESSION_EXPIRY, expiry.toString()),
      ])

      console.log('✅ ALL VERIFICATION DATA SAVED SUCCESSFULLY')

      // Verify the data was saved by reading it back
      const verification = await Promise.all([
        this.getItem(AUTH_KEYS.IS_VERIFIED),
        this.getItem(AUTH_KEYS.USER_TYPE),
        this.getItem(AUTH_KEYS.USER_ID),
        this.getItem(AUTH_KEYS.LOGIN_TIMESTAMP),
        this.getItem(AUTH_KEYS.SESSION_EXPIRY),
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
      console.log('📖 READING AUTH SESSION FROM HYBRID STORAGE')

      const [isVerified, userType, userId, loginTimestamp, sessionExpiry] = await Promise.all([
        this.getItem(AUTH_KEYS.IS_VERIFIED),
        this.getItem(AUTH_KEYS.USER_TYPE),
        this.getItem(AUTH_KEYS.USER_ID),
        this.getItem(AUTH_KEYS.LOGIN_TIMESTAMP),
        this.getItem(AUTH_KEYS.SESSION_EXPIRY),
      ])

      console.log('📦 Raw data from storage:', {
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
        this.deleteItem(AUTH_KEYS.IS_VERIFIED),
        this.deleteItem(AUTH_KEYS.USER_TYPE),
        this.deleteItem(AUTH_KEYS.USER_ID),
        this.deleteItem(AUTH_KEYS.LOGIN_TIMESTAMP),
        this.deleteItem(AUTH_KEYS.SESSION_EXPIRY),
      ])
      console.log('✅ Auth session cleared from hybrid storage')
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
      await this.setItem(AUTH_KEYS.SESSION_EXPIRY, newExpiry.toString())
      console.log('✅ Session extended successfully')
    } catch (error) {
      console.error('Failed to extend session:', error)
    }
  }

  /**
   * Get stored user type without validating session
   */
  async getUserType(): Promise<string | null> {
    try {
      return await this.getItem(AUTH_KEYS.USER_TYPE)
    } catch (error) {
      console.error('Failed to get user type:', error)
      return null
    }
  }
}

// Export singleton instance
export const hybridStorage = new HybridStorageService()

// Export for testing
export { HybridStorageService } 