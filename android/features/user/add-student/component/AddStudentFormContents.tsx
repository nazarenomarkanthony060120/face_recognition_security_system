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
              className="w-full py-3 bg-white/10 border border-white/10 rounded-xl"
              placeholder="Enter student ID"
              placeholderTextColor="#ffffff80"
              value={value}
              onChangeText={onChange}
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
              className="w-full py-3 bg-white/10 border border-white/10 rounded-xl"
              placeholder="Enter student's full name"
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
    </View>
  )
}

export default AddStudentFormContents
