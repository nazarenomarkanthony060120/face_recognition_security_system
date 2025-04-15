import { View, Text } from 'react-native'
import React from 'react'
import { TypoProps } from '@/utils/types'

const Typo = ({ children, className }: TypoProps) => {
  return (
    <View className=''>
      <Text className={className}>{children}</Text>
    </View>
  )
}

export default Typo
