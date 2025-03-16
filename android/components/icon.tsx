import { TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { IconProps } from '@/utils/types'

const Icon = ({ className, name, size, color }: IconProps) => {
  return (
    <TouchableOpacity className={className}>
      <AntDesign name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default Icon