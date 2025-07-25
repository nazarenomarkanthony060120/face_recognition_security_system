import { View, Text } from 'react-native'
import React from 'react'
import ViewAnalytics from '@/features/user/view-analytics/ViewAnalytics'
import { useLocalSearchParams } from 'expo-router'

const ViewAnalyticsScreen = () => {
  const { studentId } = useLocalSearchParams()
  return <ViewAnalytics studentId={studentId} />
}

export default ViewAnalyticsScreen
