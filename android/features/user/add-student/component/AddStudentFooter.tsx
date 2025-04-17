import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const AddStudentFooter = () => {
  return (
    <SafeAreaView className=" mb-16">
      <Typo className="text-slate-200 text-sm">All right reserved @2025</Typo>
      <Typo className="text-slate-200 text-sm">
        Face Recognition Security System
      </Typo>
    </SafeAreaView>
  )
}

export default AddStudentFooter
