import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native'
import React from 'react'

interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle
  icon?: React.ReactNode
  onPress?: () => void
  loading?: boolean
  children?: React.ReactNode
  className?: string
}

const Button = ({
  onPress,
  loading,
  icon,
  children,
  className,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={className}>
        {icon && icon}
        {loading ? (
          <ActivityIndicator className="text-red-500" />
        ) : (
          <Text className={'uppercase font-[18]'}>{children}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button
