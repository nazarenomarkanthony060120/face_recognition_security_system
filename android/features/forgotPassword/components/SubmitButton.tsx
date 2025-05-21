import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface SubmitButtonProps {
  onPress: () => void
  isLoading: boolean
}

export const SubmitButton = ({ onPress, isLoading }: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-white p-4 rounded-lg mb-4 ${isLoading ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text className="text-[#1e3a8a] text-center font-bold text-lg">
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Text>
    </TouchableOpacity>
  )
}
