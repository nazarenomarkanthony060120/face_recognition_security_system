import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react-native'
import { Text } from 'react-native'

interface InputProps extends TextInputProps {
  icon?: React.ReactNode
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  inputRef?: React.RefObject<TextInput>
  className?: string
  isPassword?: boolean
  error?: string
  isIconRight?: boolean
  isIconLeft?: boolean
  multiline?: boolean
  numberOfLines?: number
}

const Input = ({
  isIconRight = false,
  isIconLeft = false,
  icon,
  className,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  isPassword,
  error,
  multiline = false,
  numberOfLines = 1,
  editable = true,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  return (
    <View>
      <View className="flex-row px-4 py-1 items-center gap-2 bg-cyan-100 w-full rounded-2xl border-2 border-cyan-600 relative">
        {isIconLeft && icon && icon}
        <TextInput
          className={className}
          placeholder={placeholder}
          secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
        />
        {isIconRight && icon && icon}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-5"
          >
            {isPasswordVisible ? (
              <Eye size={24} color="gray" />
            ) : (
              <EyeOff size={24} color="gray" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red">{error}</Text>}
    </View>
  )
}

export default Input
