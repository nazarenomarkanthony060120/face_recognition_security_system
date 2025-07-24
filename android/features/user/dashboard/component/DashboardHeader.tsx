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
    id: auth.user?.uid,
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
          <Typo className="text-3xl text-white font-bold">My Students</Typo>
          <Typo className="text-gray-400">
            Welcome back, {auth.user?.displayName || 'User'}
          </Typo>
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
            onPress={navigateToAddStudent}
          >
            <MaterialIcons name="person-add" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/10 p-3 rounded-full"
            onPress={navigateToProfile}
          >
            <MaterialIcons name="person" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
        <View className="mb-4">
          <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-2">
            <MaterialIcons name="search" size={20} color="#ffffff80" />
            <TextInput
              className="flex-1 text-white ml-2 py-2"
              placeholder="Search students..."
              placeholderTextColor="#ffffff80"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <MaterialIcons name="close" size={20} color="#ffffff80" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}

      <View className="flex-row gap-4">
        <TouchableOpacity
          className="flex-1 bg-white/10 p-4 rounded-xl"
          onPress={() => setShowSearch(false)}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Typo className="text-gray-400">Total Boarders</Typo>
            <MaterialIcons name="people" size={20} color="#ffffff80" />
          </View>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Typo className="text-2xl text-white font-bold">
                {stats.total}
              </Typo>
              <Typo className="text-xs text-gray-400 mt-1">
                {stats.total === 1 ? 'Enrolled boarder' : 'Enrolled boarders'}
              </Typo>
            </>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          className="flex-1 bg-white/10 p-4 rounded-xl"
          onPress={() => setShowSearch(false)}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Typo className="text-gray-400">Present Today</Typo>
            <MaterialIcons name="check-circle" size={20} color="#4ade80" />
          </View>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Typo className="text-2xl text-green-400 font-bold">
                {stats.present}
              </Typo>
              <Typo className="text-xs text-gray-400 mt-1">
                {stats.present === 1
                  ? 'Student in school'
                  : 'Students in school'}
              </Typo>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-white/10 p-4 rounded-xl"
          onPress={() => setShowSearch(false)}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Typo className="text-gray-400">Absent</Typo>
            <MaterialIcons name="cancel" size={20} color="#f87171" />
          </View>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Typo className="text-2xl text-red-400 font-bold">
                {stats.absent}
              </Typo>
              <Typo className="text-xs text-gray-400 mt-1">
                {stats.absent === 1
                  ? 'Student not present'
                  : 'Students not present'}
              </Typo>
            </>
          )}
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default DashboardHeader
