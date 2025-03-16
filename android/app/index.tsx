import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { useRouter } from "expo-router"

const index = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push("/screens/login")
    }, 2000)
  }, [])

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold">Welcome to the App!</Text>
    </View>
  )
}

export default index
