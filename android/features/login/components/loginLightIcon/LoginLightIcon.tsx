import { Image } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { LIGHT_ICON, LOGO } from '@/constants/image'

export const LoginLightIcon = () => {
  return (
    <Animated.View entering={FadeInDown.delay(500).duration(1500).damping(1).springify()} className="relative justify-center items-center pt-20">
      <Image className="h-[150px] w-[150px] rounded-full "
        resizeMode="contain"
        source={LOGO}
      />
  </Animated.View>
  )
}
