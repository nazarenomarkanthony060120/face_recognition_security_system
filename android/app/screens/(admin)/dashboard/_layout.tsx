import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/parts/TabBar'

const _layout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="addParent" options={{ title: 'Add Parent' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}

export default _layout
