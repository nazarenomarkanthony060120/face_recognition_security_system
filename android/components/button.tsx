import { View, Text, TouchableOpacity, ButtonProps, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/utils/types'

const Button = ({ onPress, loading, icon, children, className}: CustomButtonProps) => {
  
  if (loading) {
    return (
      <TouchableOpacity onPress={onPress} className={className}>
        <View className='flex-row justify-center items-center w-full'>
          { icon && icon}
          <Text className={'uppercase font-[18]'}>{children}</Text>
        </View>
      </TouchableOpacity>
    ) 
  }
  
  return (
    <TouchableOpacity onPress={onPress} className={className}>
      <View className='flex-row justify-center items-center w-full'>
        { icon && icon}
        { loading ? <ActivityIndicator /> : <Text className={'uppercase font-[18]'}>{children}</Text>}
      </View>
    </TouchableOpacity>
  )
}

export default Button