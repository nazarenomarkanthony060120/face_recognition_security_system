import 'react-native-gesture-handler'
import '../global.css'
import { Stack } from 'expo-router'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/auth'
import { StatusBar } from 'react-native'
import { verifyInstallation } from 'nativewind'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSessionExtension } from '../hooks/common/useSessionExtension'

const client = new QueryClient()

// Component to handle session extension
const SessionManager = ({ children }: { children: React.ReactNode }) => {
  useSessionExtension()
  return <>{children}</>
}

const RootLayout = () => {
  verifyInstallation()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <SessionManager>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar backgroundColor="black"></StatusBar>
          </SessionManager>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
