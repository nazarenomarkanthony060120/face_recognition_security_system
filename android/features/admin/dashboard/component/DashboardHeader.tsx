import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const DashboardHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center mb-5">
      <Typo className="text-3xl text-slate-200 font-bold text-center">
        Parent Lists
      </Typo>
    </SafeAreaView>
  )
}

export default DashboardHeader
