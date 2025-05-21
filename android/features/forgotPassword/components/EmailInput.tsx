import React from 'react'
import { Text } from 'react-native'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { MaterialIcons } from '@expo/vector-icons'
import Input from '@/components/input'

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
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Enter your email'}
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
            editable={!isDisabled}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mb-2">
              {errors.email.message?.toString()}
            </Text>
          )}
        </>
      )}
      name="email"
    />
  )
}
