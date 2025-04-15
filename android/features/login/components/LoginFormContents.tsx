import { View } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { MaterialIcons } from '@expo/vector-icons'
import Input from '@/components/input'

interface LoginFormContentsProps {
  control: Control<FieldValues>
}
const LoginFormContents = ({ control }: LoginFormContentsProps) => {
  return (
    <View className="gap-2 pt-11">
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Email'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={
              <MaterialIcons
                name={'alternate-email'}
                size={20}
                color="#00bdcf"
              />
            }
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Password'}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            isIconLeft
            icon={<MaterialIcons name={'key'} size={20} color="#00bdcf" />}
            isPassword={true}
          />
        )}
      />
    </View>
  )
}

export default LoginFormContents
