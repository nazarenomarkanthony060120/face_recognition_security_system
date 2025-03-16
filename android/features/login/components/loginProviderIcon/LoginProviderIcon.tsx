import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeInUp } from 'react-native-reanimated'
import Icon from '@/components/icon'

const LoginProviderIcon = () => {
  return (
    <Animated.View entering={FadeInUp.delay(700).duration(500).damping(1).springify()} className="mt-10 flex items-center px-5 gap-2">
      <Text className="text-2xl">or</Text>
      <View className="flex-row gap-4 mt-4">
        <Icon className="p-3 bg-white rounded-full" name={'google'} size={24} color="red"/>
        <Icon className="p-3 bg-white rounded-full" name={'facebook-square'} size={24} color="blue"/>
        <Icon className="p-3 bg-white rounded-full" name={'linkedin-square'} size={24} color="blue"/>
      </View>
    </Animated.View>
  )
}

export default LoginProviderIcon