import React from 'react'
import ImageWrapper from '@/components/parts/Image'
import { SPLASH_ICON } from '@/constants/image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const LoginFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <ImageWrapper source={SPLASH_ICON} style={{ height: 145, width: 120 }} />
      <Typo className="text-[34px] text-slate-200 font-bold text-center">
        Welcome Back
      </Typo>
      <Typo className="text-lg text-slate-300 font-bold text-center">
        Login to your account
      </Typo>
    </SafeAreaView>
  )
}

export default LoginFormHeader
