import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'

const AddParentFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <View className="bg-white/20 p-4 rounded-full mb-4">
        <MaterialIcons name="person-add" size={32} color="#ffffff" />
      </View>
      <Typo className="text-3xl text-white font-bold text-center mb-2">
        Create Parent Account
      </Typo>
      <Typo className="text-gray-400 text-center text-base">
        Fill in the details below to create a new parent account
      </Typo>
    </SafeAreaView>
  )
}

export default AddParentFormHeader
