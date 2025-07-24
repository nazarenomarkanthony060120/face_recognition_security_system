import { View } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Input from '@/components/input'
import { AntDesign } from '@expo/vector-icons'
import Typo from '@/components/typo'

interface AddStudentFormContentsProps {
  control: Control<FieldValues>
}

const AddStudentFormContents = ({ control }: AddStudentFormContentsProps) => {
  return (
    <View className="gap-4">
      <View>
        <Typo className="text-white mb-2">ID:</Typo>
        <Controller
          control={control}
          name="studentId"
          rules={{
            required: 'ID: is required',
            minLength: {
              value: 5,
              message: 'ID: must be at least 5 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full text-white py-3 bg-white/10 border border-white/10 rounded-xl"
              placeholder="Enter ID"
              placeholderTextColor="#ffffff80"
              value={value}
              onChangeText={onChange}
              keyboardType='number-pad'
              secureTextEntry={false}
              isIconLeft
              icon={<AntDesign name="idcard" size={20} color="#ffffff" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-white mb-2">Full Name</Typo>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Boarder Name is required',
            minLength: {
              value: 5,
              message: 'Boarder Name must be at least 5 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full text-white py-3 bg-white/10 border border-white/10 rounded-xl"
              placeholder="Enter full name"
              placeholderTextColor="#ffffff80"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<AntDesign name="user" size={20} color="#ffffff" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-white mb-2">Contact Number</Typo>
        <Controller
          control={control}
          name="contactNumber"
          rules={{
            required: 'Contact Number is required',
            minLength: {
              value: 5,
              message: 'Contact Number must be at least 5 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full text-white py-3 bg-white/10 border border-white/10 rounded-xl"
              placeholder="Enter contact number"
              placeholderTextColor="#ffffff80"
              keyboardType='number-pad'
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<AntDesign name="phone" size={20} color="#ffffff" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-white mb-2">Resident Address</Typo>
        <Controller
          control={control}
          name="address"
          rules={{
            required: 'Resident Address is required',
            minLength: {
              value: 5,
              message: 'Resident Address must be at least 5 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full text-white py-3 bg-white/10 border border-white/10 rounded-xl"
              placeholder="Enter resident address"
              placeholderTextColor="#ffffff80"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<AntDesign name="home" size={20} color="#ffffff" />}
            />
          )}
        />
      </View>
    </View>
  )
}

export default AddStudentFormContents
