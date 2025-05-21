import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'
import { useRouter } from 'expo-router'

const MyStudentHeader = () => {
  const router = useRouter()
  const navigateToDashboard = () => {
    router.push('/screens/(user)/dashboard/dashboard')
  }

  return (
    <SafeAreaView className="p-4">
      <Button
        className="bg-white/10 w-32 flex-row items-center gap-2 p-3 rounded-xl border border-white/10"
        onPress={navigateToDashboard}
      >
        <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        <Typo className="text-white font-medium">Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default MyStudentHeader
