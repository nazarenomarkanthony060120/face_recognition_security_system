import React from 'react'
import { View, TextInput, Text } from 'react-native'

interface OTPInputProps {
  otp: string
  onChangeText: (text: string) => void
  isLoading: boolean
  phoneNumber: string | null
}

export const OTPInput = ({
  otp,
  onChangeText,
  isLoading,
  phoneNumber,
}: OTPInputProps) => {
  return (
    <View className="mb-6">
      <TextInput
        className="border border-gray-300 rounded-lg p-4 text-center text-xl"
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={onChangeText}
        editable={!isLoading}
      />
      <Text className="text-gray-600 mt-2 text-center">
        Enter the 6-digit code sent to {phoneNumber}
      </Text>
    </View>
  )
}
