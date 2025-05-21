import React from 'react'
import ImageWrapper from '@/components/parts/Image'
import { SPLASH_ICON } from '@/constants/image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const LoginFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center mb-8">
      <ImageWrapper source={SPLASH_ICON} style={{ height: 145, width: 120 }} />
      <Typo className="text-[32px] text-white font-bold text-center mt-6">
        Welcome Back
      </Typo>
      <Typo className="text-base text-gray-300 text-center mt-2">
        Sign in to continue to your account
      </Typo>
    </SafeAreaView>
  )
}

export default LoginFormHeader
