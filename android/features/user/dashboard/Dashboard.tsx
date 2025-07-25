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

const Dashboard = () => {
  const auth = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const { refetch: refetchStudents } = useFetchAllStudents({
    id: auth.user?.uid,
  })
  const { refetch: refetchAttendance } = useFetchLatestAttendanceStatus({
    id: auth.user?.uid,
  })

  const onRefresh = async () => {
    setRefreshing(true)
    await Promise.all([refetchStudents(), refetchAttendance()])
    setRefreshing(false)
  }

  return (
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
  )
}

export default Dashboard
