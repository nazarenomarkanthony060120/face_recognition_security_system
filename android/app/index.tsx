import Button from '@/components/button'
import Footer from '@/components/parts/Footer'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/typo'
import { SPLASH_ICON } from '@/constants/image'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const router = useRouter()

  const navigateToLogin = () => {
    router.replace('/(auth)/login')
  }

  return (
    <SafeAreaView className="flex-1 px-10 bg-slate-800">
      <View className="h-1/2 flex items-center justify-center">
        <ImageWrapper
          source={SPLASH_ICON}
          style={{ height: 220, width: 170 }}
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
