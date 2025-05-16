import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request notification permissions
export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    throw new Error('Permission to receive notifications was denied');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return true;
};

// Send OTP notification
export const sendOTPNotification = async (otp: string) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your OTP Code',
        body: `Your OTP for Face Recognition Security System is: ${otp}. This code will expire in 5 minutes.`,
        data: { otp },
      },
      trigger: null, // Send immediately
    });
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Failed to send OTP notification');
  }
}; 