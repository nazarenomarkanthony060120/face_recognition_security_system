import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export const Header = () => {
  const router = useRouter()

  return (
    <>
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View className="items-center mb-8">
        <MaterialIcons name="lock-reset" size={80} color="#00bdcf" />
        <Text className="text-2xl font-bold mt-4">Forgot Password</Text>
        <Text className="text-gray-600 mt-2 text-center">
          Enter your email address and we'll send you instructions to reset your
          password
        </Text>
      </View>
    </>
  )
}
