import {
  View,
  Image,
  ImageSourcePropType,
  ImageStyle,
  RecursiveArray,
  Falsy,
  RegisteredStyle,
  ImageResizeMode,
} from 'react-native'
import React from 'react'

interface ImageWrapperProps {
  source: ImageSourcePropType | undefined
  style?:
    | ImageStyle
    | RecursiveArray<Falsy | ImageStyle | RegisteredStyle<ImageStyle>>
  resizeMode?: ImageResizeMode
  className?: string
}

const ImageWrapper = ({
  source,
  style,
  resizeMode,
  className,
}: ImageWrapperProps) => {
  return (
    <View className={className}>
      <Image source={source} style={style} resizeMode={resizeMode} />
    </View>
  )
}

export default ImageWrapper
