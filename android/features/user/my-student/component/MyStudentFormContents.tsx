import { View, Text } from 'react-native'
import React from 'react'
import { Student } from '@/utils/types'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'

interface MyStudentFormContentsProps {
  student: Student | null | undefined
}

const MyStudentFormContents = ({ student }: MyStudentFormContentsProps) => {
  const renderStudent = (item: Student) => (
    <SafeAreaView className="flex-1 mx-5">
      <View className="items-center">
        <Text className="text-sm font-bold text-slate-200">
          {item.studentId}
        </Text>
        <Text className="text-xl font-bold text-slate-200">{item.name}</Text>
        <Text className="text-sm font-bold text-slate-200">
          {item.gradeSection}
        </Text>
      </View>
    </SafeAreaView>
  )

  return (
    <FlashList
      data={student ? [student] : []}
      renderItem={({ item }) => renderStudent(item)}
      keyExtractor={(item) => item.id}
      estimatedItemSize={100}
    />
  )
}

export default MyStudentFormContents
