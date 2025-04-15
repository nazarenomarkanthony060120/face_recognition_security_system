import '../global.css'
import { Stack } from 'expo-router'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/auth'
import { StatusBar } from 'react-native'
import { verifyInstallation } from 'nativewind'

const client = new QueryClient()

const RootLayout = () => {
  verifyInstallation()
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar backgroundColor="black"></StatusBar>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default RootLayout
