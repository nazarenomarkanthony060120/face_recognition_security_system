import { View } from 'react-native'
import React from 'react'
import Typo from '@/components/typo'

const DashboardHeader = () => {
  return (
    <View className="mb-5">
      <Typo className="text-2xl font-bold text-white text-center">
        My Students
      </Typo>
    </View>
  )
}

export default DashboardHeader
