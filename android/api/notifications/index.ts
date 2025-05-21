import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
})

// Request notification permissions
export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.warn('Permission to receive notifications was denied')
      return false
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return true
  } catch (error) {
    console.warn('Error requesting notification permissions:', error)
    return false
  }
}

// Send OTP notification
export const sendOTPNotification = async (otp: string) => {
  try {
    // Check if we have permission
    const hasPermission = await requestNotificationPermissions()
    if (!hasPermission) {
      // If no permission, just return the OTP
      console.log('OTP (notifications not available):', otp)
      return true
    }

    // Send local notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your OTP Code',
        body: `Your OTP for Face Recognition Security System is: ${otp}. This code will expire in 5 minutes.`,
        data: { otp },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // Send immediately
    })

    return true
  } catch (error) {
    console.error('Error sending notification:', error)
    // If notification fails, just log the OTP
    console.log('OTP (notification failed):', otp)
    return true
  }
}
