import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { useRouter } from 'expo-router'
import { useLogout } from '@/hooks/logout'
import { MaterialIcons } from '@expo/vector-icons'

const ProfileFooter = () => {
  const { mutate: logout, error, isPending } = useLogout()
  const router = useRouter()

  const onSubmit = () => {
    logout(undefined, {
      onSuccess: () => {
        router.replace('/(auth)/login')
      },
      onError: (error) => {
        console.log(error.message)
      },
    })
  }

  return (
    <View className="gap-3 mb-10 mt-8">
      <Button
        className="bg-white/10 items-center rounded-xl p-4 flex-row justify-center gap-2 border border-white/10"
        onPress={onSubmit}
        loading={isPending}
      >
        <MaterialIcons name="logout" size={24} color="#ffffff" />
        <Typo className="text-white font-medium text-lg">Sign Out</Typo>
      </Button>
      {error && (
        <Typo className="text-red-400 text-center">{error.message}</Typo>
      )}
    </View>
  )
}

export default ProfileFooter
