import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const AddStudentFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Typo className="text-[34px] text-cyan-500 font-bold text-center">
        Add your Student
      </Typo>
      <Typo className="text-lg text-cyan-500 font-bold text-center">
        Complete your registration
      </Typo>
    </SafeAreaView>
  )
}

export default AddStudentFormHeader
