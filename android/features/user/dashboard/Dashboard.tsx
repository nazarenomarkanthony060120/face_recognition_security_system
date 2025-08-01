import React, { useState } from 'react'
import User from '../User'
import DashboardHeader from './component/DashboardHeader'
import DashboardFormCard from './component/DashboardFormCard'
import AttendanceWarning from './component/AttendanceWarning'
import { LinearGradient } from 'expo-linear-gradient'
import { SearchProvider } from './context/SearchContext'
import { ScrollView, RefreshControl } from 'react-native'
import { useAuth } from '@/context/auth'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'
import { useFetchLatestAttendanceStatus } from '@/hooks/common/fetchLatestAttendance'
import {
  sendDiscordErrorNotification,
  createErrorNotification,
} from '@/utils/discordNotification'
import ErrorBoundary from '@/components/parts/ErrorBoundary'

const Dashboard = () => {
  const auth = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const { refetch: refetchStudents } = useFetchAllStudents({
    id: auth.getUserId?.(),
  })
  const { refetch: refetchAttendance } = useFetchLatestAttendanceStatus({
    id: auth.getUserId?.(),
  })

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([refetchStudents(), refetchAttendance()])
    } catch (error) {
      console.error('Dashboard refresh error:', error)

      // Send Discord notification for dashboard refresh error
      const errorNotification = createErrorNotification(
        'DASHBOARD',
        `User dashboard refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        {
          userInfo: {
            userId: auth.getUserId?.(),
            userType: auth.authSession?.userType,
            email: auth.user?.email || undefined,
          },
          additionalContext: {
            dashboardType: 'USER',
            operation: 'refresh',
            error:
              error instanceof Error
                ? {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                  }
                : String(error),
          },
        },
      )
      sendDiscordErrorNotification(errorNotification)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <ErrorBoundary errorContext="DASHBOARD">
      <SearchProvider>
        <LinearGradient
          colors={['#1e3a8a', '#7c3aed']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1"
        >
          <User className="flex-1 justify-between p-5">
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#7c3aed']}
                  tintColor="#7c3aed"
                />
              }
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <DashboardHeader />
              <AttendanceWarning />
              <DashboardFormCard />
            </ScrollView>
          </User>
        </LinearGradient>
      </SearchProvider>
    </ErrorBoundary>
  )
}

export default Dashboard
