import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface ResendOTPProps {
  timer: number
  canResend: boolean
  onResend: () => void
  isLoading: boolean
}

export const ResendOTP = ({
  timer,
  canResend,
  onResend,
  isLoading,
}: ResendOTPProps) => {
  return (
    <View className="items-center">
      {timer > 0 ? (
        <Text className="text-gray-600">Resend code in {timer} seconds</Text>
      ) : (
        <TouchableOpacity onPress={onResend} disabled={isLoading}>
          <Text
            className={`text-[#00bdcf] font-bold ${isLoading ? 'opacity-50' : ''}`}
          >
            Resend OTP
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
