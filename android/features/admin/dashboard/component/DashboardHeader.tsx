import React, { useState, useMemo } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFetchAllParents } from '@/hooks/admin/useFetchAllParents'

interface DashboardHeaderProps {
  onSearch: (query: string) => void
  onStatusFilter: (status: 'all' | 'active' | 'inactive') => void
  currentStatusFilter: 'all' | 'active' | 'inactive'
}

const DashboardHeader = ({
  onSearch,
  onStatusFilter,
  currentStatusFilter,
}: DashboardHeaderProps) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: parents = [] } = useFetchAllParents()

  const stats = useMemo(() => {
    const total = parents.length
    const active = parents.filter(
      (parent) => Number(parent.status) === 1,
    ).length
    const inactive = parents.filter(
      (parent) => Number(parent.status) === 0,
    ).length

    return { total, active, inactive }
  }, [parents])

  const handleSearch = (text: string) => {
    setSearchQuery(text)
    onSearch(text)
  }

  return (
    <SafeAreaView className="mb-6">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Typo className="text-3xl text-white font-bold">Dashboard</Typo>
          <Typo className="text-gray-400">Welcome back, Admin</Typo>
        </View>
        <TouchableOpacity
          className="bg-white/10 p-3 rounded-full"
          onPress={() => router.push('/screens/(admin)/dashboard/addParent')}
        >
          <MaterialIcons name="person-add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4 mb-6">
        <View className="flex-1 bg-white/10 p-4 rounded-xl">
          <Typo className="text-gray-400 mb-1">Total Parents</Typo>
          <Typo className="text-2xl text-white font-bold">{stats.total}</Typo>
        </View>
        <View className="flex-1 bg-white/10 p-4 rounded-xl">
          <Typo className="text-gray-400 mb-1">Active</Typo>
          <Typo className="text-2xl text-green-400 font-bold">
            {stats.active}
          </Typo>
        </View>
        <View className="flex-1 bg-white/10 p-4 rounded-xl">
          <Typo className="text-gray-400 mb-1">Inactive</Typo>
          <Typo className="text-2xl text-red-400 font-bold">
            {stats.inactive}
          </Typo>
        </View>
      </View>

      <View className="flex-row gap-2 mb-4">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-lg ${
            currentStatusFilter === 'all' ? 'bg-white/20' : 'bg-white/10'
          }`}
          onPress={() => onStatusFilter('all')}
        >
          <Typo className="text-white text-center">All</Typo>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-lg ${
            currentStatusFilter === 'active' ? 'bg-white/20' : 'bg-white/10'
          }`}
          onPress={() => onStatusFilter('active')}
        >
          <Typo className="text-green-400 text-center">Active</Typo>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-lg ${
            currentStatusFilter === 'inactive' ? 'bg-white/20' : 'bg-white/10'
          }`}
          onPress={() => onStatusFilter('inactive')}
        >
          <Typo className="text-red-400 text-center">Inactive</Typo>
        </TouchableOpacity>
      </View>

      <View className="bg-white/10 rounded-xl p-3 flex-row items-center">
        <MaterialIcons name="search" size={24} color="#ffffff80" />
        <TextInput
          placeholder="Search parents..."
          placeholderTextColor="#ffffff80"
          className="flex-1 ml-2 text-white"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')} className="p-1">
            <MaterialIcons name="close" size={20} color="#ffffff80" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

export default DashboardHeader
