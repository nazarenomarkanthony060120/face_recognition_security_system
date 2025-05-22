import React, { useState } from 'react'
import DashboardFormCard from './component/DashboardFormCard'
import DashboardHeader from './component/DashboardHeader'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, RefreshControl } from 'react-native'
import { useFetchAllParents } from '@/hooks/admin/useFetchAllParents'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all')
  const [refreshing, setRefreshing] = useState(false)
  const { refetch } = useFetchAllParents()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleStatusFilter = (status: 'all' | 'active' | 'inactive') => {
    setStatusFilter(status)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-4">
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
        >
          <DashboardHeader
            onSearch={handleSearch}
            onStatusFilter={handleStatusFilter}
            currentStatusFilter={statusFilter}
          />
          <DashboardFormCard
            searchQuery={searchQuery}
            statusFilter={statusFilter}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Dashboard
