import {
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import React, { useState, useMemo } from 'react'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import { useSearch } from '../context/SearchContext'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'

const DashboardHeader = () => {
  const router = useRouter()
  const auth = useAuth()
  const { searchQuery, setSearchQuery } = useSearch()
  const [showSearch, setShowSearch] = useState(false)
  const { data: students, isLoading } = useFetchAllStudents({
    id: auth.getUserId?.(),
  })

  const stats = useMemo(() => {
    if (!students) return { total: 0, present: 0, absent: 0 }

    // Mock attendance data - replace with actual attendance data
    const presentCount = Math.floor(students.length * 0.7) // 70% present
    const absentCount = students.length - presentCount

    return {
      total: students.length,
      present: presentCount,
      absent: absentCount,
    }
  }, [students])

  const navigateToProfile = () => {
    router.push('/screens/(user)/dashboard/profile')
  }

  const navigateToAddStudent = () => {
    router.push('/screens/(user)/dashboard/addStudent')
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Typo className="text-3xl text-white font-bold">Dashboard</Typo>
          <Typo className="text-gray-400">Welcome back!</Typo>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="bg-white/10 p-3 rounded-full"
            onPress={() => setShowSearch(!showSearch)}
          >
            <MaterialIcons name="search" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/10 p-3 rounded-full"
            onPress={navigateToProfile}
          >
            <MaterialIcons name="person" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/10 p-3 rounded-full"
            onPress={navigateToAddStudent}
          >
            <MaterialIcons name="person-add" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
        <View className="mb-6">
          <View className="bg-white/10 rounded-xl border border-white/10">
            <TextInput
              className="px-4 py-3 text-white"
              placeholder="Search students..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
          </View>
        </View>
      )}

      <View className="flex-row gap-4 mb-6">
        <View className="flex-1 bg-white/10 p-4 rounded-xl border border-white/10">
          <View className="flex-row items-center justify-between">
            <View>
              <Typo className="text-2xl font-bold text-white">
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  stats.total
                )}
              </Typo>
              <Typo className="text-gray-400 text-sm">Total Students</Typo>
            </View>
            <View className="bg-blue-500/20 p-2 rounded-lg">
              <MaterialIcons name="people" size={24} color="#3B82F6" />
            </View>
          </View>
        </View>

        {/* <View className="flex-1 bg-white/10 p-4 rounded-xl border border-white/10">
          <View className="flex-row items-center justify-between">
            <View>
              <Typo className="text-2xl font-bold text-white">
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  stats.present
                )}
              </Typo>
              <Typo className="text-gray-400 text-sm">Present</Typo>
            </View>
            <View className="bg-green-500/20 p-2 rounded-lg">
              <MaterialIcons name="check-circle" size={24} color="#10B981" />
            </View>
          </View>
        </View>

        <View className="flex-1 bg-white/10 p-4 rounded-xl border border-white/10">
          <View className="flex-row items-center justify-between">
            <View>
              <Typo className="text-2xl font-bold text-white">
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  stats.absent
                )}
              </Typo>
              <Typo className="text-gray-400 text-sm">Absent</Typo>
            </View>
            <View className="bg-red-500/20 p-2 rounded-lg">
              <MaterialIcons name="cancel" size={24} color="#EF4444" />
            </View>
          </View>
        </View> */}
      </View>
    </View>
  )
}

export default DashboardHeader
