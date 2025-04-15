import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginHeader from './LoginHeader'
import LoginFooter from './LoginFooter'

interface LoginLayoutProps {
  children: React.ReactNode
  className: string
}

const LoginLayout = ({ children, className }: LoginLayoutProps) => {
  return (
    <SafeAreaView className={className}>
      <LoginHeader />
      {children}
      <LoginFooter />
    </SafeAreaView>
  )
}

export default LoginLayout
