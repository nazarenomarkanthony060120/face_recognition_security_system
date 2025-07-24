import { View } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { MaterialIcons } from '@expo/vector-icons'
import Input from '@/components/input'
import Typo from '@/components/typo'

interface LoginFormContentsProps {
  control: Control<FieldValues>
}

const LoginFormContents = ({ control }: LoginFormContentsProps) => {
  return (
    <View className="gap-4">
      <View>
        <Typo className="text-gray-400 text-sm mb-2">Email Address</Typo>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full p-3 bg-white/10 text-white rounded-xl  border border-white/10"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              keyboardType="email-address"
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color="#ffffff"
                />
              }
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-400 text-sm mb-2">Password</Typo>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 bg-white/10 rounded-xl text-white border border-white/10"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              isIconLeft
              icon={<MaterialIcons name="lock" size={20} color="#ffffff" />}
              isPassword={true}
            />
          )}
        />
      </View>
    </View>
  )
}

export default LoginFormContents
