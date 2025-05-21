import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'

interface SubmitButtonProps {
  onPress: () => void
  isLoading: boolean
}

export const SubmitButton = ({ onPress, isLoading }: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-white/20 p-4 rounded-xl mb-6 border border-white/10 flex-row items-center justify-center gap-3 ${isLoading ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={isLoading}
    >
      <MaterialIcons
        name={isLoading ? 'hourglass-empty' : 'send'}
        size={24}
        color="#ffffff"
      />
      <Typo className="text-white font-semibold text-lg">
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Typo>
    </TouchableOpacity>
  )
}
