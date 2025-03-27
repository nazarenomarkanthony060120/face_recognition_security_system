import { Image, Dimensions } from 'react-native'
import React from 'react'
import { BACKGROUND_ICON } from '@/constants/image'

const { width, height } = Dimensions.get("window")

export const LoginBackground = () => {
  return (
    <Image
      className={'absolute w-full h-full'}
      source={BACKGROUND_ICON}
      style={{ width: width, height: height + 50 }}
    />
  )
}
