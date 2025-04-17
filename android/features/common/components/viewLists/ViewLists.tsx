import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Student } from '@/utils/types'
import { useRouter } from 'expo-router'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_BLACK_ICON } from '@/constants/image'

interface ViewListsProps {
  student: Student
}

const ViewLists = ({ student }: ViewListsProps) => {
  const router = useRouter()

  const navigateToMyStudent = () => {
    router.push('/screens/(user)/myStudent/myStudent')
  }

  return (
    <TouchableOpacity
      className="p-4 m-2 bg-white rounded-lg shadow"
      onPress={navigateToMyStudent}
    >
      <View className="flex-row items-center gap-5">
        <ImageWrapper
          source={PERSON_BLACK_ICON}
          style={{ height: 45, width: 45 }}
        />
        <View>
          <Text className="text-xl text-slate-800 font-bold">
            {student.studentId}
          </Text>
          <Text className="text-lg text-slate-800 font-bold">
            {student.name}
          </Text>
          <Text className="text-sm text-slate-800">{student.gradeSection}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ViewLists
