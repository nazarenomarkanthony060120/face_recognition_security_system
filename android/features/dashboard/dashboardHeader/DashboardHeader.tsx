import { View, Text } from 'react-native'
import React from 'react'
import DashboardAddStudent from '../dashboardAddStudent/DashboardAddStudent'
import DashboardLogout from '../dashboardLogout/DashboardLogout'
import DashboardProfile from '../dashboardProfile/DashboardProfile'
import Typo from '@/components/typo'

const DashboardHeader = ({ header }: {header: String}) => {
  return (
    <View className='py-5'>
      <Typo className='text-2xl font-bold text-white text-center'>{header}</Typo>
      <DashboardLogout />
      <DashboardProfile />
    </View>
  )
}

export default DashboardHeader