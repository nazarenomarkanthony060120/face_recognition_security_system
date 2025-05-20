import Button from '@/components/button'
import Footer from '@/components/parts/Footer'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/typo'
import { SPLASH_ICON } from '@/constants/image'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(false)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to initialize app'),
        )
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  const navigateToLogin = () => {
    try {
      router.push('/(auth)/login')
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Navigation failed'))
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-800 items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-slate-800 items-center justify-center px-10">
        <Typo className="text-white text-center mb-4">
          Error: {error.message}
        </Typo>
        <Button
          className="bg-cyan-500 items-center rounded-3xl p-5"
          onPress={() => setIsLoading(true)}
        >
          <Typo className="text-white">Retry</Typo>
        </Button>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 px-10 bg-slate-800">
      <View className="h-1/2 flex items-center justify-center">
        <ImageWrapper
          source={SPLASH_ICON}
          style={{ height: 220, width: 170 }}
          onError={(e) => setError(new Error('Failed to load splash image'))}
        />
      </View>
      <View className="flex justify-between h-1/2 pb-5 ">
        <View className="flex gap-5">
          <View>
            <Typo className="text-center text-2xl font-bold text-gray-200">
              Face Recognition Security System
            </Typo>
          </View>
          <View>
            <Typo className="text-center text-md font-bold text-gray-300 leading-7">
              Our boarding house system uses face recognition for quick, secure,
              and contactless access for your student/s.
            </Typo>
          </View>
        </View>

        <Footer className="flex gap-4">
          <Button
            className="bg-cyan-500 items-center rounded-3xl p-5"
            onPress={navigateToLogin}
          >
            <Typo className="text-white">Sign In</Typo>
          </Button>
        </Footer>
      </View>
    </SafeAreaView>
  )
}

export default index
