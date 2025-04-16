import { View } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form'
import Input from '@/components/input'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

interface AddParentFormContentsProps {
  control: Control<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

const AddParentFormContents = ({
  control,
  getValues,
}: AddParentFormContentsProps) => {
  return (
    <View className="gap-2 pt-11">
      <Controller
        control={control}
        name="parentName"
        rules={{
          required: 'Parent Name is required',
          minLength: {
            value: 5,
            message: 'Parent Name must be at least 5 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Parent Name'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<FontAwesome5 name={'user'} size={20} color="#00bdcf" />}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email Address is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Email Address'}
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
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
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
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Confirm Password is required',
          validate: (value) =>
            value === getValues('password') || 'Passwords do not match',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Confirm Password'}
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

export default AddParentFormContents
