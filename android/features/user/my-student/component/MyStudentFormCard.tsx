import { View } from 'react-native'
import React from 'react'
import { Student } from '@/utils/types'
import MyStudentFormHeader from './MyStudentFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyStudentFormContents from './MyStudentFormContents'
import HistoryLists from '@/features/common/components/historyLists/HistoryLists'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'

interface MyStudentFormCardProps {
  student: Student | null | undefined
}

const MyStudentFormCard = ({ student }: MyStudentFormCardProps) => {
  return (
    <View className="p-5">
      <View className="bg-white/10 p-6 rounded-2xl border border-white/10">
        <View className="flex-row items-center gap-3 mb-6">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="person" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">
              Boarder Details
            </Typo>
            <Typo className="text-gray-400 text-sm">
              View boarder information and history
            </Typo>
          </View>
        </View>

        <SafeAreaView className="gap-4">
          <MyStudentFormHeader />
          <MyStudentFormContents student={student} />
          {/* <HistoryLists id={student?.id} /> */}
        </SafeAreaView>
      </View>
    </View>
  )
}

export default MyStudentFormCard
