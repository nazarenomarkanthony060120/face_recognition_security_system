import { View, Text, ScrollViewComponent, ScrollView } from 'react-native'
import React from 'react'
import Typo from '@/components/typo'
import DashboardAddStudent from '../dashboard/dashboardAddStudent/DashboardAddStudent'
import DashboardLogout from '../dashboard/dashboardLogout/DashboardLogout'
import DashboardProfile from '../dashboard/dashboardProfile/DashboardProfile'

const Background = ({ children, header }: { children: React.ReactNode, header: string}) => {
  return (
    <View className='flex-1'>
      <ScrollView className="flex-1 bg-slate-900 gap-40 p-5">
        <Typo className='text-2xl font-bold text-white text-center mb-5'>{header}</Typo>
        <View className='flex gap-3'>
          {children}
        </View>
      </ScrollView>
      <DashboardAddStudent />
      <DashboardLogout />
      <DashboardProfile />
    </View>
  )
}

export default Background