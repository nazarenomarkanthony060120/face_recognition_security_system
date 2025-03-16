import { Image } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { LIGHT_ICON } from '@/constants/image'

const LoginLightIcon = () => {
  return (
    <Animated.View entering={FadeInDown.delay(500).duration(1500).damping(1).springify()} className="flex-row justify-around items-center absolute w-full">
      <Image className="h-[225px] w-[90px]" 
        resizeMode="contain"
        source={LIGHT_ICON}
      />
      <Image className="h-[165px] w-[80px]" 
        resizeMode="contain"
        source={LIGHT_ICON}
      />
    </Animated.View>
  )
}

export default LoginLightIcon