import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { AuthErrorType, LoginRequest } from '@/utils/types'
import LoginFormHeader from './LoginFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginFormContents from './LoginFormContents'
import LoginFormFooter from './LoginFormFooter'
import { ScrollView, View } from 'react-native'
import Typo from '@/components/typo'
import { useRouter } from 'expo-router'
import { useLogin } from '@/hooks/login'
import { getUserRoutes } from '@/features/common/part/getUserRoutes'
import { getErrorMessage } from '@/features/common/part/getErrorMessage'
import Error from '@/components/parts/Error'
import {
  sendDiscordErrorNotification,
  createErrorNotification,
} from '@/utils/discordNotification'

const LoginController = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [authError, setAuthError] = useState<AuthErrorType>()
  const { mutate: login, error, isPending } = useLogin()
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data as LoginRequest, {
      onSuccess: (data) => {
        router.push({
          pathname: '/(auth)/loginAuthentication',
          params: { type: data?.type, phoneNumber: data?.phoneNumber },
        })
      },
      onError: (error: Error) => {
        const errorMessage = getErrorMessage(error.message)
        setAuthError(errorMessage)
        
        // Send Discord notification for login error
        const errorNotification = createErrorNotification(
          'LOGIN',
          `Login failed: ${error.message}`,
          {
            userInfo: {
              email: (data as LoginRequest).email
            },
            additionalContext: {
              formData: {
                email: (data as LoginRequest).email,
                // Don't include password for security
                hasPassword: !!(data as LoginRequest).password
              },
              originalError: error.message,
              processedError: errorMessage
            }
          }
        )
        sendDiscordErrorNotification(errorNotification)
      },
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-4">
        <LoginFormHeader />
        <View className="bg-white/10 p-6 rounded-2xl border border-white/10">
          <LoginFormContents control={control} />
          <LoginFormFooter
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isPending={isPending}
          />

          {authError && (
            <View className="mt-4 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <Typo className="text-red-400 text-center">{authError}</Typo>
            </View>
          )}
          {Object.keys(errors).length > 0 && <Error errors={errors} />}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginController
