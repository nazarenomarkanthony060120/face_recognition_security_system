import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'

interface CountDownProps {
  time: number
  route: any
  message: string
  setShowCountdown: React.Dispatch<React.SetStateAction<boolean>>
}

const CountDown = ({
  time,
  route,
  message,
  setShowCountdown,
}: CountDownProps) => {
  const router = useRouter()
  const [countdown, setCountdown] = useState<number>(time)
  useEffect(() => {
    if (countdown === null) return

    if (countdown === 0) {
      setShowCountdown(false)
      router.push(route)
    } else {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [countdown])
  return (
    <View className="items-center pt-5">
      <Text className="text-lg text-emerald-200">
        {message} - {countdown}
      </Text>
    </View>
  )
}

export default CountDown
