import React from 'react'
import LoginLayout from './components/LoginLayout'
import LoginController from './components/LoginFormCard'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-4">
        <LoginLayout className="flex-1 justify-between">
          <LoginController />
        </LoginLayout>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Login
