import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'

export const BackToLoginButton = () => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="bg-white/10 p-4 rounded-xl border border-white/10 flex-row items-center justify-center gap-3"
    >
      <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
      <Typo className="text-white font-medium">Back to Login</Typo>
    </TouchableOpacity>
  )
}
