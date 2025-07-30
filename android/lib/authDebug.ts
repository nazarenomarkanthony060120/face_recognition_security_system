import { auth } from '@/lib/firestore'
import { secureStorage } from '@/lib/secureStorage'

/**
 * Debug utility to check current authentication status
 */
export const debugAuthStatus = async () => {
  console.log('=== AUTH DEBUG STATUS ===')

  try {
    // Check Firebase Auth state
    const firebaseUser = auth.currentUser
    console.log('Firebase User:', {
      uid: firebaseUser?.uid,
      email: firebaseUser?.email,
      isSignedIn: !!firebaseUser,
    })

    // Check secure storage session
    const authSession = await secureStorage.getAuthSession()
    console.log('Secure Storage Session:', {
      hasSession: !!authSession,
      isVerified: authSession?.isVerified,
      userType: authSession?.userType,
      loginTimestamp: authSession?.loginTimestamp ? new Date(authSession.loginTimestamp).toISOString() : null,
      sessionExpiry: authSession?.sessionExpiry ? new Date(authSession.sessionExpiry).toISOString() : null,
      isExpired: authSession ? authSession.sessionExpiry < Date.now() : null,
    })

    // Overall status
    const isFullyAuthenticated = !!firebaseUser && !!authSession && authSession.isVerified
    console.log('Overall Status:', {
      isFullyAuthenticated,
      canAutoLogin: isFullyAuthenticated,
    })

    return {
      firebase: {
        isSignedIn: !!firebaseUser,
        uid: firebaseUser?.uid,
        email: firebaseUser?.email,
      },
      session: authSession,
      canAutoLogin: isFullyAuthenticated,
    }
  } catch (error) {
    console.error('Auth debug error:', error)
    return null
  }
}

/**
 * Clear all authentication data (for testing logout)
 */
export const debugClearAuth = async () => {
  console.log('=== CLEARING AUTH DATA ===')

  try {
    // Clear secure storage
    await secureStorage.clearAuthSession()
    console.log('Secure storage cleared')

    // Sign out from Firebase
    if (auth.currentUser) {
      await auth.signOut()
      console.log('Firebase auth cleared')
    }

    console.log('All auth data cleared')
  } catch (error) {
    console.error('Failed to clear auth data:', error)
  }
}

/**
 * Force set verification status (for testing)
 */
export const debugSetVerified = async (userType: string) => {
  console.log('=== FORCE SET VERIFIED ===')

  try {
    await secureStorage.setUserVerified(userType)
    console.log(`User marked as verified with type: ${userType}`)

    const session = await secureStorage.getAuthSession()
    console.log('Updated session:', session)
  } catch (error) {
    console.error('Failed to set verified status:', error)
  }
}

/**
 * Test auto login flow
 */
export const debugTestAutoLogin = async () => {
  console.log('=== TESTING AUTO LOGIN FLOW ===')

  const status = await debugAuthStatus()

  if (!status) {
    console.log('❌ Failed to get auth status')
    return false
  }

  if (!status.firebase.isSignedIn) {
    console.log('❌ User not signed in to Firebase')
    return false
  }

  if (!status.session) {
    console.log('❌ No secure storage session found')
    return false
  }

  if (!status.session.isVerified) {
    console.log('❌ User not verified')
    return false
  }

  if (status.session.sessionExpiry < Date.now()) {
    console.log('❌ Session expired')
    return false
  }

  console.log('✅ Auto login should work!')
  return true
} 