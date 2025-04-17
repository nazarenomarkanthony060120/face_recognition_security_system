import { ScrollView } from 'react-native'
import React from 'react'
import { Student } from '@/utils/types'
import MyStudentFormHeader from './MyStudentFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyStudentFormContents from './MyStudentFormContents'
import HistoryLists from '@/features/common/components/historyLists/HistoryLists'

interface MyStudentFormCardProps {
  student: Student | null | undefined
}

const MyStudentFormCard = ({ student }: MyStudentFormCardProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <MyStudentFormHeader />
        <MyStudentFormContents student={student} />
        <HistoryLists id={student?.id} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default MyStudentFormCard
