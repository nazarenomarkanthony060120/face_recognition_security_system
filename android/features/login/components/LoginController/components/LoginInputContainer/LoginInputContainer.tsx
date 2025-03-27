import { View, Text } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Input from '@/components/input'

interface LoginInputContainerProps {
  control: Control<FieldValues>
}

const LoginInputContainer = ({ control }: LoginInputContainerProps) => {
  return (
    <View className='gap-2 pt-11'>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className=" w-full placeholder:text-slate-400" placeholder="Email" value={value} onChangeText={onChange}></Input>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className=" w-full placeholder:text-slate-400" placeholder="Password"value={value} onChangeText={onChange} secureTextEntry></Input>
        )}
      />
      
    </View>
  )
}

export default LoginInputContainer