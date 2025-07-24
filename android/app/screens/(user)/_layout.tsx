import React from 'react'
import { Stack } from 'expo-router'
import { AuthGuard } from '@/components/parts/AuthGaurd'

export default function UserLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  )
}
