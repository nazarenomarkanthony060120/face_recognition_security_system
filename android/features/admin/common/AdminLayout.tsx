import { SafeAreaView } from 'react-native'
import React from 'react'
import { AuthGuard } from '@/components/parts/AuthGaurd'

interface AdminLayoutProps {
  children: React.ReactNode
  className: string
}
const AdminLayout = ({ children, className }: AdminLayoutProps) => {
  return (
    <AuthGuard>
      <SafeAreaView className={className}>{children}</SafeAreaView>
    </AuthGuard>
  )
}

export default AdminLayout
