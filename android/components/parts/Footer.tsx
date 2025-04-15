import { View } from 'react-native'
import React from 'react'

interface FooterProps {
  children: React.ReactNode
  className?: string
}
const Footer = ({ children, className }: FooterProps) => {
  return <View className={className}>{children}</View>
}

export default Footer
