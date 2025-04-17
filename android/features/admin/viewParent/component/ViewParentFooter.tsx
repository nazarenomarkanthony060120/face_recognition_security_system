import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const ViewParentFooter = () => {
  return (
    <SafeAreaView className="">
      <Typo className="text-slate-200 text-sm">All right reserved @2025</Typo>
      <Typo className="text-slate-200 text-sm">
        Face Recognition Security System
      </Typo>
    </SafeAreaView>
  )
}

export default ViewParentFooter
