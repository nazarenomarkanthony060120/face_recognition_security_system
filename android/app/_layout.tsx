import 'react-native-gesture-handler'
import '../global.css'
import { Stack } from 'expo-router'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/auth'
import { StatusBar } from 'react-native'
import { verifyInstallation } from 'nativewind'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const client = new QueryClient()

const RootLayout = () => {
  verifyInstallation()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar backgroundColor="black"></StatusBar>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
