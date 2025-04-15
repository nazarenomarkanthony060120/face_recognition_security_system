import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import Typo from '@/components/typo'

const AddStudentFooter = () => {
  return (
    <SafeAreaView className="gap-3 mb-20">
      <Button className="bg-cyan-400 items-center rounded-3xl p-5">
        <Typo className="text-white">Add Student</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default AddStudentFooter
