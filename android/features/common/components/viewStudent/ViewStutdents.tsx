import { View, Text } from 'react-native'
import React from 'react'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentById'

interface ViewStutdentsProps {
  id: string | undefined
}

const ViewStutdents = ({ id }: ViewStutdentsProps) => {
  const { data: studentsData, isLoading } = useFetchAllStudents({ id })
  return (
    <View>
      <Text>ViewStutdents</Text>
    </View>
  )
}

export default ViewStutdents
