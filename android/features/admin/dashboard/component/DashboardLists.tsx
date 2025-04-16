import { Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { ParentType, UserStatusValue } from '@/utils/types'
import { getUserStatus } from '../../common/components/getUserStatus'

interface DashboardListsProps {
  parent: ParentType
}

const DashboardLists = ({ parent }: DashboardListsProps) => {
  const router = useRouter()

  const navigateToViewParent = () => {
    router.replace({
      pathname: '/screens/(admin)/viewParent/viewParent',
      params: { id: parent.id },
    })
  }

  return (
    <Pressable
      className="p-4 m-2 bg-white rounded-lg shadow"
      onPress={navigateToViewParent}
    >
      <Text className="text-lg font-bold">{parent.name}</Text>
      <Text className="text-sm text-gray-600">{parent.email}</Text>
      <Text
        className={`text-sm ${getUserStatus(Number(parent.status)) === UserStatusValue.ACTIVE ? 'text-green-600' : 'text-red-600'}`}
      >
        {getUserStatus(Number(parent.status))}
      </Text>
    </Pressable>
  )
}

export default DashboardLists
