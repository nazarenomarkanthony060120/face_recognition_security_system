import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface VerifyButtonProps {
  onPress: () => void
  isLoading: boolean
}

export const VerifyButton = ({ onPress, isLoading }: VerifyButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-[#00bdcf] p-4 rounded-lg mb-4 ${isLoading ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text className="text-white text-center font-bold text-lg">
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </Text>
    </TouchableOpacity>
  )
}
