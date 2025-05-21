import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'

const AddParentHeader = () => {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.replace('/screens/(admin)/dashboard/dashboard')
  }

  return (
    <SafeAreaView className="py-4">
      <Button
        className="bg-white/10 w-32 flex-row items-center gap-2 rounded-xl p-3"
        onPress={navigateToDashboard}
      >
        <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
        <Typo className="text-white font-medium">Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default AddParentHeader
