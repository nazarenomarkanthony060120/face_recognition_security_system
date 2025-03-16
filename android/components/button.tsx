import { View, Text, TouchableOpacity, ButtonProps } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/utils/types'

const Button = ({ onPress, loading, icon, children, className}: CustomButtonProps) => {
  
  if (loading) {
    return (
      <TouchableOpacity onPress={onPress} className={'w-full flex-row bg-slate-400 p-5 rounded-2xl'}>
        <View className='flex-row justify-center items-center w-full'>
          { icon && icon}
          <Text className={className}>{children}</Text>
        </View>
      </TouchableOpacity>
    ) 
  }
  
  return (
    <TouchableOpacity onPress={onPress} className={'w-full flex-row bg-sky-300 p-5 rounded-2xl'}>
      <View className='flex-row justify-center items-center w-full'>
        { icon && icon}
        <Text className={className}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button