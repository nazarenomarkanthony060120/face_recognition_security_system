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
  keyboardType = 'default',
  editable = true,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  return (
    <View>
      <View className="flex-row items-center w-full rounded-xl relative">
        {isIconLeft && <View className="pl-4 pr-2">{icon}</View>}
        <TextInput
          className={`flex-1 py-4 ${isIconLeft ? 'pl-0' : 'pl-4'} ${isIconRight ? 'pr-0' : 'pr-4'} ${className}`}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboardType}
          secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          textAlignVertical="center"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
        />
        {isIconRight && <View className="pr-4 pl-2">{icon}</View>}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-4"
          >
            {isPasswordVisible ? (
              <Eye size={20} color="#9ca3af" />
            ) : (
              <EyeOff size={20} color="#9ca3af" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-400 text-sm mt-1 ml-4">{error}</Text>}
    </View>
  )
}

export default Input
