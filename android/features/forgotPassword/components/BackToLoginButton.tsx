import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useRouter } from 'expo-router'

export const BackToLoginButton = () => {
  const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.back()} className="items-center">
      <Text className="text-white font-bold">Back to Login</Text>
    </TouchableOpacity>
  )
}
