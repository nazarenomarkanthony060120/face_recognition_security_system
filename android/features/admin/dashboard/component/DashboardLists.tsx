import { Text, Pressable, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { ParentType, UserStatusValue } from '@/utils/types'
import { PERSON_ICON } from '@/constants/image'
import { getUserStatus } from '@/features/common/part/getUserStatus'
import ImageWrapper from '@/components/parts/Image'
import { MaterialIcons } from '@expo/vector-icons'

interface DashboardListsProps {
  parent: ParentType
}

const DashboardLists = ({ parent }: DashboardListsProps) => {
  const router = useRouter()

  const navigateToViewParent = () => {
    router.push({
      pathname: '/screens/(admin)/viewParent/viewParent',
      params: { id: parent.id },
    })
  }

  const isActive =
    getUserStatus(Number(parent.status)) === UserStatusValue.ACTIVE

  return (
    <Pressable
      className="p-4 m-2 bg-white/10 rounded-xl border border-white/10"
      onPress={navigateToViewParent}
    >
      <View className="flex-row items-center gap-4">
        <View className="bg-white/20 p-3 rounded-full">
          <ImageWrapper
            source={PERSON_ICON}
            style={{ height: 35, width: 35 }}
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-white">{parent.name}</Text>
          <Text className="text-sm text-gray-400 mb-1">{parent.email}</Text>
          <View className="flex-row items-center">
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                isActive ? 'bg-green-400' : 'bg-red-400'
              }`}
            />
            <Text
              className={`text-sm ${
                isActive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {getUserStatus(Number(parent.status))}
            </Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#ffffff80" />
      </View>
    </Pressable>
  )
}

export default DashboardLists
