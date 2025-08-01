import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Student } from '@/utils/types'
import { useRouter } from 'expo-router'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'

interface ViewListsProps {
  student: Student
}

const ViewLists = ({ student }: ViewListsProps) => {
  const router = useRouter()

  const navigateToMyStudent = () => {
    router.push({
      pathname: '/screens/(user)/myStudent/myStudent',
      params: { id: student.id },
    })
  }

  return (
    <TouchableOpacity
      className="bg-white/10 p-4 rounded-xl border border-white/10 mb-3"
      onPress={navigateToMyStudent}
    >
      <View className="flex-row items-center gap-4">
        <View className="bg-white/20 p-3 rounded-full">
          <ImageWrapper
            source={PERSON_ICON}
            style={{ height: 35, width: 35 }}
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-white">{student.name}</Text>
          <View className="flex-row items-center">
            <MaterialIcons name="person" size={16} color="#ffffff80" />
            <Text className="text-sm text-gray-400 ml-2">
              {student.studentId}
            </Text>
          </View>
          {student.address && (
            <View className="flex-row items-center">
              <MaterialIcons name="home" size={16} color="#ffffff80" />
              <Text className="text-sm text-gray-400 ml-2">
                {student.address}
              </Text>
            </View>
          )}
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#ffffff80" />
      </View>
    </TouchableOpacity>
  )
}

export default ViewLists
