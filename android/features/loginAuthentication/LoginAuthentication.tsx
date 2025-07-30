import { View, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserRoutes } from '@/features/common/part/getUserRoutes'
import { UserType } from '@/utils/types'
import { sendOTP, verifyOTP } from '@/api/otp'
import { useAuth } from '@/context/auth'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Header } from './components/Header'
import { OTPInput } from './components/OTPInput'
import { VerifyButton } from './components/VerifyButton'
import { ResendOTP } from './components/ResendOTP'

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

interface LoginAuthenticationProps {
  params: URLSearchParams
}

const LoginAuthentication = ({ params }: LoginAuthenticationProps) => {
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUserVerified } = useAuth()
  const phoneNumber = params.get('phoneNumber')
  const type = params.get('type') as UserType
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    // Request notification permissions
    registerForPushNotificationsAsync()

    // Set up notification listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response:', response)
      })

    // Start the timer when component mounts
    const interval = setInterval(() => {
      setTimer((prevTimer: number) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    // Send OTP when component mounts
    handleSendOTP()

    return () => {
      clearInterval(interval)
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        )
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!')
        return
      }
    }
  }

  const sendLocalNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null, // null means show immediately
    })
  }

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is required')
      return
    }

    try {
      setIsLoading(true)
      const result = await sendOTP({ phoneNumber })
      console.log('OTP sent result:', result)

      await sendLocalNotification(
        'OTP Sent',
        `A verification code has been sent to ${phoneNumber}`,
      )
      Alert.alert('Success', 'OTP has been sent to your phone number')
    } catch (error) {
      console.error('Error sending OTP:', error)
      Alert.alert('Error', 'Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = () => {
    if (canResend) {
      setTimer(60)
      setCanResend(false)
      handleSendOTP()
    }
  }

  const handleVerifyOTP = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is required')
      return
    }

    const trimmedOTP = otp.trim()
    console.log('OTP input details:', {
      originalOTP: otp,
      trimmedOTP,
      originalLength: otp.length,
      trimmedLength: trimmedOTP.length,
      timestamp: new Date().toISOString(),
    })

    if (trimmedOTP.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP')
      return
    }

    try {
      setIsLoading(true)
      console.log('Starting OTP verification process:', {
        phoneNumber,
        inputOTP: trimmedOTP,
        inputOTPLength: trimmedOTP.length,
        inputOTPType: typeof trimmedOTP,
        inputOTPChars: trimmedOTP.split('').map((c: string) => c.charCodeAt(0)),
        timestamp: new Date().toISOString(),
      })

      const result = await verifyOTP({ phoneNumber, otp: trimmedOTP })
      console.log('✅ OTP verification successful:', result)

      // Mark user as verified in secure storage
      console.log('🔄 Attempting to save user verification...')
      if (setUserVerified) {
        await setUserVerified(type)
        console.log('✅ User verification saved successfully for type:', type)
      } else {
        console.error('❌ setUserVerified function not available!')
      }

      // Send success notification
      await sendLocalNotification(
        'Verification Successful',
        'Your phone number has been verified successfully!',
      )

      // If verification is successful, navigate to the appropriate screen based on user type
      const route = getUserRoutes({ type: type })
      console.log('🚀 Navigating to dashboard:', route)
      router.replace(route) // Use replace to prevent going back to OTP screen
    } catch (error) {
      console.error('OTP verification error:', error)

      let errorMessage = 'Failed to verify OTP. Please try again.'
      if (error instanceof Error) {
        errorMessage = error.message
        console.log('Detailed error:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        })
      }

      Alert.alert('Error', errorMessage)

      // If the error is due to an expired OTP, allow resending
      if (errorMessage.includes('expired')) {
        setCanResend(true)
        setTimer(0)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <Header />
        <OTPInput
          otp={otp}
          onChangeText={setOtp}
          isLoading={isLoading}
          phoneNumber={phoneNumber}
        />
        <VerifyButton onPress={handleVerifyOTP} isLoading={isLoading} />
        <ResendOTP
          timer={timer}
          canResend={canResend}
          onResend={handleResendOTP}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginAuthentication
