import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import Button from '@/components/button'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'
import { getUserRoutes } from '@/features/common/part/getUserRoutes'
import { UserType } from '@/utils/types'

interface ProfileHeaderProps {
  type: UserType
}

const ProfileHeader = ({ type }: ProfileHeaderProps) => {
  const router = useRouter()

  const navigateToDashboard = () => {
    const route = getUserRoutes({ type: type })
    router.push(route)
  }

  return (
    <SafeAreaView className="py-4">
      <View className="flex-row justify-between items-center">
        <View>
          <Typo className="text-3xl text-white font-bold">Profile</Typo>
          <Typo className="text-gray-400">Manage your account</Typo>
        </View>
        <Button
          className="bg-white/10 w-32 flex-row items-center gap-2 rounded-xl p-3"
          onPress={navigateToDashboard}
        >
          <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
          <Typo className="text-white font-medium">Back</Typo>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ProfileHeader
