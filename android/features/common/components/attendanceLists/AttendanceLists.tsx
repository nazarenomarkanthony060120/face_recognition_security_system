import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

interface AttendanceListsProps {
  id: string | undefined
}

const AttendanceLists = ({ id }: AttendanceListsProps) => {
  return (
    <SafeAreaView className="mt-6 p-5 bg-slate-100">
      <Typo className="text-xl text-slate-700 font-semibold">Attendance</Typo>
    </SafeAreaView>
  )
}

export default AttendanceLists
