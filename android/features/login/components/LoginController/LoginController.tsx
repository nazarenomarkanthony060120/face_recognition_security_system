
import React from 'react'
import { Text } from 'react-native'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form'
import { useLogin } from '@/hooks/login'
import Animated, { FadeInUp } from 'react-native-reanimated'
import Input from '@/components/input'
import Button from "@/components/button"
import { LoginRequest } from '@/utils/types'
import Typo from '@/components/typo'
import LoginInputContainer from './components/LoginInputContainer/LoginInputContainer'
import LoginActionContainer from './components/LoginActionContainer/LoginActionContainer'


export const LoginController = () => {
  const { control, handleSubmit } = useForm()
  const { mutate: login, error, isSuccess, isPending } = useLogin()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data as LoginRequest)
  }
  

  return (
    <Animated.View entering={FadeInUp.delay(600).duration(500).damping(1).springify()} className="pt-6 px-5 gap-2">
      <Typo className='text-white text-[24px] font-bold text-center'>Boarding House App</Typo>
      <LoginInputContainer control={control} />
      <LoginActionContainer handleSubmit={handleSubmit} isPending={isPending} onSubmit={onSubmit} />
      <Typo>{error && <Typo className='text-red'>{error.message}</Typo>}</Typo>
    </Animated.View>
  )
}
