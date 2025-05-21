import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import Typo from '@/components/typo'

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
      <Typo>Loading</Typo>
    </View>
  )
}

export default LoadingIndicator
