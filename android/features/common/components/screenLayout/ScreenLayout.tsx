import { AuthGuard } from '@/components/parts/AuthGaurd'
import React from 'react'

interface ScreenLayoutProps {
  children: React.ReactNode
}

const ScreenLayout = ({ children }: ScreenLayoutProps) => {
  return <AuthGuard>{children}</AuthGuard>
}

export default ScreenLayout
