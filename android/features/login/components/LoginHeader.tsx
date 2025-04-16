import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Button from '@/components/button'
import Typo from '@/components/typo'

const LoginHeader = () => {
  const router = useRouter()

  const navigateToBack = () => {
    router.push('/')
  }

  return (
    <SafeAreaView className="py-5">
      <Button
        className="w-44 flex-row items-center gap-2"
        onPress={navigateToBack}
        icon={
          <Ionicons
            name="arrow-back"
            className="bg-cyan-500 rounded-lg p-2"
            size={16}
            color="white"
          />
        }
      >
        <Typo className="text-white">Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default LoginHeader
