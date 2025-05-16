import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/typo'

const AddParentHeader = () => {
  const router = useRouter()

  const navigateToMyStore = () => {
    router.replace('/screens/(admin)/dashboard/dashboard')
  }

  return (
    <SafeAreaView className="py-5">
      <Button
        className="w-44 flex-row items-center gap-2"
        onPress={navigateToMyStore}
        icon={
          <Ionicons
            name="arrow-back"
            className="bg-cyan-500 rounded-lg p-2"
            size={16}
            color="white"
          />
        }
      >
        <Typo className="text-slate-200">Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default AddParentHeader
