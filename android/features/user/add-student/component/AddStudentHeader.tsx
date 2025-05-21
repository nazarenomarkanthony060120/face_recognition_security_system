import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Button from '@/components/button'
import Typo from '@/components/typo'

const AddStudentHeader = () => {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.replace('/screens/(user)/dashboard/dashboard')
  }

  return (
    <SafeAreaView className="py-4">
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

export default AddStudentHeader
