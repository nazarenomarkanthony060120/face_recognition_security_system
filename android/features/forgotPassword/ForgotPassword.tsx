import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { sendPasswordResetEmail } from 'firebase/auth'
import Input from '@/components/input'
import { auth } from '@/lib/firestore'

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
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View className="items-center mb-8">
          <MaterialIcons name="lock-reset" size={80} color="#00bdcf" />
          <Text className="text-2xl font-bold mt-4">Forgot Password</Text>
          <Text className="text-gray-600 mt-2 text-center">
            Enter your email address and we'll send you instructions to reset
            your password
          </Text>
        </View>

        <View className="mb-6">
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                className={'w-full py-3 placeholder:text-slate-400 '}
                placeholder={'Enter your email'}
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                isIconLeft
                icon={
                  <MaterialIcons
                    name={'alternate-email'}
                    size={20}
                    color="#00bdcf"
                  />
                }
                editable={!resetPasswordMutation.isPending}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mb-2">
              {errors.email.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          className={`bg-[#00bdcf] p-4 rounded-lg mb-4 ${
            resetPasswordMutation.isPending ? 'opacity-50' : ''
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={resetPasswordMutation.isPending}
        >
          <Text className="text-white text-center font-bold text-lg">
            {resetPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center"
        >
          <Text className="text-[#00bdcf] font-bold">Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword
