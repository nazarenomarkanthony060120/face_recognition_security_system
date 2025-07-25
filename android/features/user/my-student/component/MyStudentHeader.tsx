import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'
import { useRouter } from 'expo-router'
import { Student } from '@/utils/types'

interface MyStudentHeaderProps {
  student: Student | null | undefined
}

const MyStudentHeader = ({ student }: MyStudentHeaderProps) => {
  const router = useRouter()
  const navigateToDashboard = () => {
    router.push('/screens/(user)/dashboard/dashboard')
  }

  const navigateToAnalytics = () => {
    router.push({
      pathname: '/screens/(user)/viewAnalytics/viewAnalytics',
      params: {
        studentId: student?.id,
      },
    })
  }

  return (
    <SafeAreaView className="p-4 flex-row justify-between">
      <Button
        className="bg-white/10 w-32 flex-row items-center gap-2 p-3 rounded-xl border border-white/10"
        onPress={navigateToDashboard}
      >
        <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        <Typo className="text-white font-medium">Back</Typo>
      </Button>
      <Button
        className="bg-white/10 w-44 flex-row items-center gap-2 p-3 rounded-xl border border-white/10"
        onPress={navigateToAnalytics}
      >
        <Ionicons name="analytics" size={24} color="#ffffff" />
        <Typo className="text-white font-medium ml-3">View Analytics</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default MyStudentHeader
