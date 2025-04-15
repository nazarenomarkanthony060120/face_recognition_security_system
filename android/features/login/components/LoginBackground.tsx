import { Image, Dimensions, View } from 'react-native'
import React from 'react'
import { BACKGROUND_ICON } from '@/constants/image'

const { width, height } = Dimensions.get('window')

const LoginBackground = () => {
  return (
    <View
      className={
        'absolute w-full h-full z-0 bg-gradient-to-tl from-sky-300 to-sky-600'
      }
    >
      <Image
        className={'absolute w-full h-full'}
        source={BACKGROUND_ICON}
        style={{ width: width, height: height + 50 }}
      />
    </View>
  )
}

export default LoginBackground
