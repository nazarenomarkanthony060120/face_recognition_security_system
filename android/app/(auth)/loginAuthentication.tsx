import React from 'react'
import LoginAuthentication from '@/features/loginAuthentication/LoginAuthentication'
import { useSearchParams } from 'expo-router/build/hooks'

const LoginAuthenticationScreen = () => {
  const params = useSearchParams()
  return <LoginAuthentication params={params} />
}

export default LoginAuthenticationScreen
