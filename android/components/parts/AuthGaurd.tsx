import React, { useEffect } from 'react'
import { useAuth } from '@/context/auth'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/login')
    }
  }, [user, loading, router])

  if (loading) return <LoadingIndicator />

  return user ? <>{children}</> : null
}
