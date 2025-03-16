import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { InputProps } from '@/utils/types'


const Input = (props: InputProps) => {
  return (
    <View className="flex-row px-4 py-2 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
      { props.icon && props.icon }
      <TextInput className={props.className} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} value={props.value} onChangeText={props.onChangeText}></TextInput>
    </View>
  )
}

export default Input