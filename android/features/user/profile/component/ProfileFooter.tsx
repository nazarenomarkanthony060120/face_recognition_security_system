import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { useRouter } from 'expo-router'
import { useLogout } from '@/hooks/logout'

const ProfileFooter = () => {
  const { mutate: logout, error, isPending } = useLogout()
  const router = useRouter()

  const onSubmit = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/(auth)/login')
      },
      onError: (error) => {
        console.log(error.message)
      },
    })
  }

  return (
    <SafeAreaView className="gap-3 mb-10">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={onSubmit}
        loading={isPending}
      >
        <Typo className="text-white">Logout</Typo>
      </Button>
      <Typo>{error && <Typo className="text-red">{error.message}</Typo>}</Typo>
    </SafeAreaView>
  )
}

export default ProfileFooter
