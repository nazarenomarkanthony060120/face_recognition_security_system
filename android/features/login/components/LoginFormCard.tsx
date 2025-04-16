import React from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useLogin } from '@/hooks/login'
import { LoginRequest } from '@/utils/types'
import { useRouter } from 'expo-router'
import LoginFormHeader from './LoginFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginFormContents from './LoginFormContents'
import LoginFormFooter from './LoginFormFooter'
import { ScrollView } from 'react-native'
import Typo from '@/components/typo'
import { getUserRoutes } from '@/features/common/part/getUserRoutes'

const LoginController = () => {
  const { control, handleSubmit } = useForm()
  const { mutate: login, error, isPending } = useLogin()
  const router = useRouter()

  if (!router) return

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data as LoginRequest, {
      onSuccess: (data) => {
        const route = getUserRoutes(data?.type)
        router.replace()
      },
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <LoginFormHeader />
        <LoginFormContents control={control} />
        <LoginFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
        />

        <Typo>
          {error && <Typo className="text-red">{error.message}</Typo>}
        </Typo>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginController
