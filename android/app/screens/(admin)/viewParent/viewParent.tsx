import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const viewParent = () => {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>{id} ohyeah</Text>
    </View>
  )
}

export default viewParent
