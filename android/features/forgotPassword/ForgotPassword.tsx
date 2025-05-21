import { View, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firestore'
import { Header } from './components/Header'
import { EmailInput } from './components/EmailInput'
import { SubmitButton } from './components/SubmitButton'
import { BackToLoginButton } from './components/BackToLoginButton'

interface ForgotPasswordForm {
  email: string
}

const ForgotPassword = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>()

  const resetPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      try {
        await sendPasswordResetEmail(auth, email)
        return true
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      Alert.alert(
        'Success',
        'Password reset email has been sent. Please check your email.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ],
      )
    },
    onError: (error: any) => {
      Alert.alert(
        'Error',
        error.message || 'Failed to send reset email. Please try again.',
      )
    },
  })

  const onSubmit = (data: ForgotPasswordForm) => {
    resetPasswordMutation.mutate(data.email)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <Header />

        <View className="mb-6">
          <EmailInput
            control={control}
            errors={errors}
            isDisabled={resetPasswordMutation.isPending}
          />
        </View>

        <SubmitButton
          onPress={handleSubmit(onSubmit)}
          isLoading={resetPasswordMutation.isPending}
        />

        <BackToLoginButton />
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword
