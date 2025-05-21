import { View } from 'react-native'
import React from 'react'
import Typo from '@/components/typo'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoadingIndicator = () => {
  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center items-center">
          <View className="bg-white/10 p-6 rounded-2xl border border-white/10 items-center">
            <View className="bg-white/20 p-4 rounded-full mb-4">
              <MaterialIcons name="hourglass-top" size={32} color="#ffffff" />
            </View>
            <Typo className="text-white text-lg font-medium mb-1">Loading</Typo>
            <Typo className="text-gray-400 text-sm">
              Please wait while we fetch the data
            </Typo>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default LoadingIndicator
