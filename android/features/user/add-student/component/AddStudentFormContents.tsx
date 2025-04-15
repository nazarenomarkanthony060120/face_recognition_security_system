import { View } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Input from '@/components/input'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

interface AddStudentFormContentsProps {
  control: Control<FieldValues>
}

const AddStudentFormContents = ({ control }: AddStudentFormContentsProps) => {
  return (
    <View className="gap-2 pt-11">
      <Controller
        control={control}
        name="id"
        rules={{
          required: 'Student Id is required',
          minLength: {
            value: 5,
            message: 'Student Id must be at least 5 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Student Id'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<AntDesign name={'idcard'} size={20} color="#00bdcf" />}
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Student Name is required',
          minLength: {
            value: 5,
            message: 'Student Name must be at least 5 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Student Name'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<AntDesign name={'user'} size={20} color="#00bdcf" />}
          />
        )}
      />
      <Controller
        control={control}
        name="gradeSection"
        rules={{ required: 'Grade and Section is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Grade and Section. ex: 2-A'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<MaterialIcons name={'grade'} size={20} color="#00bdcf" />}
          />
        )}
      />
    </View>
  )
}

export default AddStudentFormContents
