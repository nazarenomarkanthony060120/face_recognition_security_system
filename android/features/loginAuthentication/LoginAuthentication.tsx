import { View, Text } from 'react-native'
import React from 'react'

interface LoginAuthenticationProps {
  params: URLSearchParams
}

const LoginAuthentication = ({ params }: LoginAuthenticationProps) => {
  return (
    <View>
      <Text>
        {params.get('phoneNumber')} - {params.get('type')}
      </Text>
    </View>
  )
}

export default LoginAuthentication
