import { Href } from 'expo-router'
// import { Firestore, Timestamp } from "firebase/firestore"
import { Icon } from 'phosphor-react-native'
import React, { ReactNode } from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ImageStyle,
  PressableProps,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'

export type ScreenWrapperProps = {
  style?: ViewStyle
  children: React.ReactNode
}
export type ModalWrapperProps = {
  style?: ViewStyle
  children: React.ReactNode
  bg?: string
}

export type TypoProps = {
  size?: number
  color?: string
  fontWeight?: TextStyle['fontWeight']
  children: any | null
  style?: TextStyle
  textProps?: TextProps
  className?: string
}

export type IconComponent = React.ComponentType<{
  height?: number
  width?: number
  strokeWidth?: number
  color?: string
  fill?: string
}>

export type IconProps = {
  name: any
  color?: string
  size?: number
  strokeWidth?: number
  fill?: string
  className?: string
}

export type BackButtonProps = {
  style?: ViewStyle
  iconSize?: number
}
export interface InputProps extends TextInputProps {
  icon?: React.ReactNode
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  inputRef?: React.RefObject<TextInput>
  className?: string
  //   label?: string
  //   error?: string
}

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle
  icon?: React.ReactNode
  onPress?: () => void
  loading?: boolean
  children: React.ReactNode
  className?: string
}

export type ResponseType = {
  success: boolean
  data?: any
  msg?: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type AddStudent = {
  userId: string
  studentId: string
  name: string
  gradeSection: string
}
