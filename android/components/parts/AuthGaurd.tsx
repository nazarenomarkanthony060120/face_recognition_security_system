import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface AuthGuardProps {
  children?: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { loading, isVerified, authSession, isInitialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait for auth to be fully initialized
    if (!isInitialized || loading) {
      return
    }

    // Check if user has valid session instead of Firebase user
    if (!isVerified || !authSession) {
      console.log('🛡️ AuthGuard: No valid session, redirecting to login')
      console.log('- Is verified:', isVerified)
      console.log('- Has session:', !!authSession)
      router.replace('/(auth)/login')
    } else {
      console.log('🛡️ AuthGuard: Valid session found, allowing access')
      console.log('- User type:', authSession.userType)
    }
  }, [isVerified, authSession, loading, isInitialized, router])

  // Show loading while auth is initializing
  if (!isInitialized || loading) {
    return <LoadingIndicator />
  }

  // Only render children if user has valid session
  return isVerified && authSession ? <>{children}</> : null
}
