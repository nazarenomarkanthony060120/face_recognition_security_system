import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useRouter } from 'expo-router'

export const BackToLoginButton = () => {
  const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.back()} className="items-center">
      <Text className="text-[#00bdcf] font-bold">Back to Login</Text>
    </TouchableOpacity>
  )
}
