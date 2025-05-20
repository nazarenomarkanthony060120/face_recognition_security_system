import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export const Header = () => {
  return (
    <View className="items-center mb-8">
      <MaterialIcons name="verified-user" size={80} color="#00bdcf" />
      <Text className="text-2xl font-bold mt-4">Verify Your Phone</Text>
    </View>
  )
}
