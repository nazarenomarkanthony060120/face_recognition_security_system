import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Button from '@/components/button'
import Typo from '@/components/typo'

const LoginFooter = () => {
  const router = useRouter()

  const navigateToRegister = () => {
    // router.replace('/(auth)/register')
  }

  return (
    <SafeAreaView className="py-5">
      {/* <Button
        className="bg-emerald-300 items-center rounded-3xl p-5"
        onPress={navigateToRegister}
      >
        <Typo>Create an account</Typo>
      </Button> */}
    </SafeAreaView>
  )
}

export default LoginFooter
