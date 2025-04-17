import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { TabBar } from '@/components/parts/TabBar'
import { useAuth } from '@/context/auth'

const _layout = () => {
  const router = useRouter()
  const auth = useAuth()
  if (!auth.user) {
    router.replace('/(auth)/login')
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="addStudent" options={{ title: 'Add Student' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}

export default _layout
