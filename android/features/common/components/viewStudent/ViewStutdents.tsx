import { View, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'

interface ViewStutdentsProps {
  id: string | undefined
}

const ViewStutdents = ({ id }: ViewStutdentsProps) => {
  const { data: studentsData, isLoading } = useFetchAllStudents({ id })

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    )
  }

  if (!studentsData) {
    return (
      <View className="flex-1 items-center justify-center">
        <Typo className="text-white">No students found</Typo>
      </View>
    )
  }

  return (
    <View className="mt-6">
      {/* Section Header */}
      <View className="bg-white/10 p-4 rounded-xl border border-white/10 mb-4">
        <View className="flex-row items-center gap-3">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="school" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">
              Enrolled Students
            </Typo>
            <Typo className="text-gray-400 text-sm">
              List of students under this parent
            </Typo>
          </View>
        </View>
      </View>

      {/* Students List */}
      <ScrollView showsVerticalScrollIndicator={false} className="gap-3">
        {studentsData.map((student) => (
          <View
            key={student.id}
            className="bg-white/10 p-4 rounded-xl border border-white/10"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-white/20 p-3 rounded-full">
                <ImageWrapper
                  source={PERSON_ICON}
                  style={{ height: 35, width: 35 }}
                />
              </View>
              <View className="flex-1">
                <Typo className="text-lg font-bold text-white">
                  {student.name}
                </Typo>
                <Typo className="text-sm text-gray-400 mb-1">
                  {student.studentId}
                </Typo>
                <Typo className="text-sm text-gray-400">
                  {student.gradeSection}
                </Typo>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ffffff80" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default ViewStutdents
