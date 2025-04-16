import { Text, Pressable, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { ParentType, UserStatusValue } from '@/utils/types'
import { getUserStatus } from '../../common/components/getUserStatus'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_BLACK_ICON } from '@/constants/image'

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

  return (
    <Pressable
      className="p-4 m-2 bg-white rounded-lg shadow"
      onPress={navigateToViewParent}
    >
      <View className="flex-row items-center gap-5">
        <ImageWrapper
          source={PERSON_BLACK_ICON}
          style={{ height: 45, width: 45 }}
        />
        <View>
          <Text className="text-lg font-bold">{parent.name}</Text>
          <Text className="text-sm text-gray-600">{parent.email}</Text>
          <Text
            className={`text-sm ${getUserStatus(Number(parent.status)) === UserStatusValue.ACTIVE ? 'text-green-600' : 'text-red-600'}`}
          >
            {getUserStatus(Number(parent.status))}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default DashboardLists
