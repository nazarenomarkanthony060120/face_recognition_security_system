import { SafeAreaView } from 'react-native'
import React from 'react'

interface UserLayoutProps {
  children: React.ReactNode
  className: string
}
const UserLayout = ({ children, className }: UserLayoutProps) => {
  return <SafeAreaView className={className}>{children}</SafeAreaView>
}

export default UserLayout
