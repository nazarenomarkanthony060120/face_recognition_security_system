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
  onError?: (error: Error) => void
}

const ImageWrapper = ({
  source,
  style,
  resizeMode,
  className,
  onError,
}: ImageWrapperProps) => {
  return (
    <View className={className}>
      <Image
        source={source}
        style={style}
        resizeMode={resizeMode}
        onError={(e) => onError?.(new Error('Failed to load image'))}
      />
    </View>
  )
}

export default ImageWrapper
