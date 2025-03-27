import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoginActionContainerProps { 
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
  onSubmit: SubmitHandler<FieldValues>,
  isPending: boolean
}

const LoginActionContainer = ({ handleSubmit, onSubmit, isPending }: LoginActionContainerProps) => {
  return (
    <View className='gap-2'>
      <Button className='w-full flex-row text-center bg-sky-300 p-5 rounded-2xl' onPress={handleSubmit(onSubmit)} loading={isPending}>Login</Button>
      <Typo className="text-right text-[15px] text-white">Forgot Password</Typo>
    </View>
  )
}

export default LoginActionContainer