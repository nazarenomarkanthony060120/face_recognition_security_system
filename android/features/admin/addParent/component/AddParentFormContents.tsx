import { View } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form'
import Input from '@/components/input'
import {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons'
import { Feather } from 'lucide-react-native'

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
        name="phoneNumber"
        rules={{
          required: 'Phone Number is required',
          minLength: {
            value: 11,
            message: 'Phone Number must be at least 11 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Phone Number'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<AntDesign name={'phone'} size={20} color="#00bdcf" />}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{
          required: 'Address is required',
          minLength: {
            value: 5,
            message: 'Address must be at least 5 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Address'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<Entypo name={'location-pin'} size={20} color="#00bdcf" />}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email Address is not valid',
          },
        }}
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
            value: 8,
            message: 'Password must be at least 8 characters',
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
