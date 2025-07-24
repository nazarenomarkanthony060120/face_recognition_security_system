import React from 'react'
import { Stack } from 'expo-router'
import { AuthGuard } from '@/components/parts/AuthGaurd'

export default function AdminLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  )
}
