import React from 'react'
import { Text, View } from 'react-native'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { MaterialIcons } from '@expo/vector-icons'
import Input from '@/components/input'
import Typo from '@/components/typo'

interface EmailInputProps {
  control: Control<any>
  errors: FieldErrors
  isDisabled?: boolean
}

export const EmailInput = ({
  control,
  errors,
  isDisabled,
}: EmailInputProps) => {
  return (
    <Controller
      control={control}
      rules={{
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      }}
      render={({ field: { onChange, value } }) => (
        <>
          <View className="mb-2">
            <Typo className="text-gray-300 text-sm">Email Address</Typo>
          </View>
          <Input
            className="w-full py-4 bg-white/10 rounded-xl border border-white/20"
            placeholder="Enter your email address"
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={
              <MaterialIcons name="alternate-email" size={20} color="#ffffff" />
            }
            editable={!isDisabled}
            placeholderTextColor="#ffffff80"
          />
          {errors.email && (
            <Text className="text-red-300 text-sm mt-2">
              {errors.email.message?.toString()}
            </Text>
          )}
        </>
      )}
      name="email"
    />
  )
}
