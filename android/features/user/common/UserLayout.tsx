import { SafeAreaView } from 'react-native'
import React from 'react'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'

interface UserLayoutProps {
  children?: React.ReactNode
  className: string
}
const UserLayout = ({ children, className }: UserLayoutProps) => {
  return (
    <ScreenLayout>
      <SafeAreaView className={className}>{children}</SafeAreaView>
    </ScreenLayout>
  )
}

export default UserLayout
