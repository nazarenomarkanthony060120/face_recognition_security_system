import { View } from 'react-native'
import React from 'react'
import { LoginBackground } from './components/loginBackground/LoginBackground'
import { LoginLightIcon } from './components/loginLightIcon/LoginLightIcon'
import { LoginController } from './components/LoginController/LoginController'
import { LoginProviderIcon } from './components/loginProviderIcon/LoginProviderIcon'

const Login = () => {
  return (
    <View className="h-screen w-full">
      <LoginBackground />
      <LoginLightIcon />
      <LoginController />
      <LoginProviderIcon />
    </View>
  )
}

export default Login