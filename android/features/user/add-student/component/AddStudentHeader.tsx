import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Button from '@/components/button'
import Typo from '@/components/typo'

const AddStudentHeader = () => {
  const router = useRouter()

  const navigateToStore = () => {
    router.replace('/screens/(user)/dashboard')
  }

  return (
    <SafeAreaView>
      <Button
        className="w-44 flex-row items-center gap-3"
        onPress={navigateToStore}
        icon={
          <Ionicons
            name="arrow-back"
            className="bg-cyan-500 rounded-lg p-2"
            size={16}
            color="white"
          />
        }
      >
        <Typo className="text-white">Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default AddStudentHeader
