import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const AddParentFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Typo className="text-[34px] text-slate-200 font-bold text-center">
        Create Parent Account
      </Typo>
    </SafeAreaView>
  )
}

export default AddParentFormHeader
