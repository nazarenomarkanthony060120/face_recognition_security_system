import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { getUserRoutes } from '@/features/common/part/getUserRoutes'
import { UserType } from '@/utils/types'
import { sendOTP, verifyOTP } from '@/api/otp'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

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
      await sendOTP({ phoneNumber })
      await sendLocalNotification(
        'OTP Sent',
        `A verification code has been sent to ${phoneNumber}`,
      )
      Alert.alert('Success', 'OTP has been sent to your phone number')
    } catch (error) {
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

    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP')
      return
    }

    try {
      setIsLoading(true)
      await verifyOTP({ phoneNumber, otp })

      // Send success notification
      await sendLocalNotification(
        'Verification Successful',
        'Your phone number has been verified successfully!',
      )

      // If verification is successful, navigate to the appropriate screen based on user type
      const route = getUserRoutes(type)
      router.push(route)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="items-center mb-8">
          <MaterialIcons name="verified-user" size={80} color="#00bdcf" />
          <Text className="text-2xl font-bold mt-4">Verify Your Phone</Text>
          <Text className="text-gray-600 mt-2">
            Enter the 6-digit code sent to {phoneNumber}
          </Text>
        </View>

        <View className="mb-6">
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-center text-xl"
            placeholder="Enter OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          className={`bg-[#00bdcf] p-4 rounded-lg mb-4 ${isLoading ? 'opacity-50' : ''}`}
          onPress={handleVerifyOTP}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>

        <View className="items-center">
          {timer > 0 ? (
            <Text className="text-gray-600">
              Resend code in {timer} seconds
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP} disabled={isLoading}>
              <Text
                className={`text-[#00bdcf] font-bold ${isLoading ? 'opacity-50' : ''}`}
              >
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginAuthentication
