import { View, Text } from 'react-native'
import React from 'react'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'

interface ViewStutdentsProps {
  id: string | undefined
}

const ViewStutdents = ({ id }: ViewStutdentsProps) => {
  const { data: studentsData, isLoading } = useFetchAllStudents({ id })
  return (
    <View className="bg-slate-200 mt-5 p-3">
      <Text className="text-center">View Stutdents</Text>
    </View>
  )
}

export default ViewStutdents
