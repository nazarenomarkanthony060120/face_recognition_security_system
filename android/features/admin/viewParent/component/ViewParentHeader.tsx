import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'

const ViewParentHeader = () => {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/screens/(admin)/dashboard/dashboard')
  }

  return (
    <SafeAreaView className="px-4 py-4">
      <TouchableOpacity
        className="bg-white/10 w-32 flex-row items-center gap-2 p-3 rounded-xl border border-white/10"
        onPress={navigateToDashboard}
      >
        <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        <Typo className="text-white font-medium">Back</Typo>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ViewParentHeader
