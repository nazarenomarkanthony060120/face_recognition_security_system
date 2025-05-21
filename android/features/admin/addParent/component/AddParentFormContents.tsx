import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
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
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons'
import Typo from '@/components/typo'

interface AddParentFormContentsProps {
  control: Control<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

const AddParentFormContents = ({
  control,
  getValues,
}: AddParentFormContentsProps) => {
  const [status, setStatus] = useState<'active' | 'inactive'>('active')

  return (
    <View className="gap-4">
      {/* User Information Section */}
      <View className="bg-white/10 p-4 rounded-xl border border-white/10">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="person" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">
              User Information
            </Typo>
            <Typo className="text-gray-400 text-sm">
              Basic information about the parent
            </Typo>
          </View>
        </View>
        <View className="gap-4">
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
                className={
                  'w-full py-4 bg-white/10 rounded-xl placeholder:text-gray-400'
                }
                placeholder={'Parent Name'}
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                isIconLeft
                icon={<FontAwesome5 name={'user'} size={20} color="#0f0f0f" />}
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
                className={
                  'w-full py-4 bg-white/10 rounded-xl placeholder:text-gray-400'
                }
                placeholder={'Phone Number'}
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                isIconLeft
                icon={<AntDesign name={'phone'} size={20} color="#0f0f0f" />}
              />
            )}
          />
        </View>
      </View>

      {/* User Address Section */}
      <View className="bg-white/10 p-4 rounded-xl border border-white/10">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="location-on" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">User Address</Typo>
            <Typo className="text-gray-400 text-sm">
              Contact and location details
            </Typo>
          </View>
        </View>
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
              className={
                'w-full py-4 bg-white/10 rounded-xl placeholder:text-gray-400'
              }
              placeholder={'Address'}
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<Entypo name={'location-pin'} size={20} color="#0f0f0f" />}
            />
          )}
        />
      </View>

      {/* User Account Section */}
      <View className="bg-white/10 p-4 rounded-xl border border-white/10">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="account-circle" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">User Account</Typo>
            <Typo className="text-gray-400 text-sm">
              Account credentials and access
            </Typo>
          </View>
        </View>
        <View className="gap-4">
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
                className={
                  'w-full py-4 bg-white/10 rounded-xl placeholder:text-gray-400'
                }
                placeholder={'Email Address'}
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                isIconLeft
                icon={
                  <MaterialIcons
                    name={'alternate-email'}
                    size={20}
                    color="#0f0f0f"
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
                className={
                  'w-full py-4 bg-white/10 rounded-xl placeholder:text-gray-400'
                }
                placeholder={'Password'}
                value={value}
                onChangeText={onChange}
                secureTextEntry
                isIconLeft
                icon={<MaterialIcons name={'key'} size={20} color="#0f0f0f" />}
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
                className={
                  'w-full py-4 bg-white/10 rounded-xl placeholder:text-gray-400'
                }
                placeholder={'Confirm Password'}
                value={value}
                onChangeText={onChange}
                secureTextEntry
                isIconLeft
                icon={<MaterialIcons name={'key'} size={20} color="#0f0f0f" />}
                isPassword={true}
              />
            )}
          />
        </View>
      </View>

      {/* Status Section */}
      <View className="bg-white/10 p-4 rounded-xl border border-white/10">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="toggle-on" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">Account Status</Typo>
            <Typo className="text-gray-400 text-sm">
              Set the account status
            </Typo>
          </View>
        </View>
        <Controller
          control={control}
          name="status"
          defaultValue="1"
          render={({ field: { onChange } }) => (
            <View className="flex-row gap-2">
              <TouchableOpacity
                className={`flex-1 py-4 rounded-xl ${
                  status === 'active' ? 'bg-green-500/20' : 'bg-white/10'
                }`}
                onPress={() => {
                  setStatus('active')
                  onChange('1')
                }}
              >
                <View className="flex-row items-center justify-center gap-2">
                  <View className="w-2 h-2 rounded-full bg-green-400" />
                  <Typo
                    className={`${
                      status === 'active' ? 'text-green-400' : 'text-white'
                    } font-medium`}
                  >
                    Active
                  </Typo>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-4 rounded-xl ${
                  status === 'inactive' ? 'bg-red-500/20' : 'bg-white/10'
                }`}
                onPress={() => {
                  setStatus('inactive')
                  onChange('0')
                }}
              >
                <View className="flex-row items-center justify-center gap-2">
                  <View className="w-2 h-2 rounded-full bg-red-400" />
                  <Typo
                    className={`${
                      status === 'inactive' ? 'text-red-400' : 'text-white'
                    } font-medium`}
                  >
                    Inactive
                  </Typo>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default AddParentFormContents
