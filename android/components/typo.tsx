import { View, Text, TextStyle } from 'react-native'
import React from 'react'
import { TextProps } from 'react-native-svg'

type TypoProps = {
  size?: number
  color?: string
  fontWeight?: TextStyle['fontWeight']
  children: any | null
  style?: TextStyle
  textProps?: TextProps
  className?: string
  icon?: React.ReactNode
  isNeed?: boolean
}

const Typo = ({ children, className, icon, isNeed = false }: TypoProps) => {
  return (
    <View
      className={`flex-row gap-1 items-center ${isNeed ? '' : 'justify-center'} `}
    >
      {icon && icon}
      <Text className={className}>{children}</Text>
    </View>
  )
}

export default Typo
