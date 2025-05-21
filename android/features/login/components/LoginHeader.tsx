import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import Typo from '@/components/typo'

const LoginHeader = () => {
  const router = useRouter()

  const navigateToBack = () => {
    router.push('/')
  }

  return (
    <SafeAreaView className="py-4">
      <TouchableOpacity
        className="bg-white/10 w-32 flex-row items-center gap-2 p-3 rounded-xl border border-white/10"
        onPress={navigateToBack}
      >
        <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        <Typo className="text-white font-medium">Back</Typo>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default LoginHeader
