import { useAuth } from '@/context/auth'
import { getUserRoutes } from '@/features/common/part/getUserRoutes'
import Login from '@/features/login/Login'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'

const LoginScreen = () => {
  const router = useRouter()
  const auth = useAuth()
  const id = auth.user?.uid

  const { data, isLoading } = useFetchUserById({ id })

  useFocusEffect(
    useCallback(() => {
      if (auth.user && data && !isLoading) {
        const route = getUserRoutes(data.type)
        router.push(route)
      }
    }, [auth.user, data, isLoading, router]),
  )

  return <Login />
}

export default LoginScreen
