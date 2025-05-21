import React from 'react'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { View } from 'react-native'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

interface LoginFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const LoginFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: LoginFormFooterProps) => {
  const router = useRouter()

  const navigateToForgotPassword = () => {
    router.push('/(auth)/forgotPassword')
  }

  return (
    <View className="gap-4 mt-6">
      <Button
        className="bg-white/20 items-center rounded-xl p-4 flex-row justify-center gap-3 border border-white/10"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <MaterialIcons
          name={isPending ? 'hourglass-empty' : 'login'}
          size={24}
          color="#ffffff"
        />
        <Typo className="text-white ml-3 font-semibold text-lg">
          {isPending ? 'Signing In...' : 'Sign In'}
        </Typo>
      </Button>
      <View className="items-end">
        <Button
          className="bg-white/10 items-center rounded-xl p-3 flex-row justify-center gap-3 border border-white/10"
          onPress={navigateToForgotPassword}
        >
          <MaterialIcons name="lock-reset" size={20} color="#ffffff" />
          <Typo className="text-white ml-3 font-medium">Forgot Password</Typo>
        </Button>
      </View>
    </View>
  )
}

export default LoginFormFooter
