import { SafeAreaView } from 'react-native'
import React from 'react'

interface AdminLayoutProps {
  children: React.ReactNode
  className: string
}
const AdminLayout = ({ children, className }: AdminLayoutProps) => {
  return <SafeAreaView className={className}>{children}</SafeAreaView>
}

export default AdminLayout
