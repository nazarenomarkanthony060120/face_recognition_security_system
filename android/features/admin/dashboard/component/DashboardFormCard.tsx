import { ActivityIndicator, View, TouchableOpacity } from 'react-native'
import React, { useState, useMemo } from 'react'
import { FlashList } from '@shopify/flash-list'
import { useFetchAllParents } from '@/hooks/admin/useFetchAllParents'
import DashboardLists from './DashboardLists'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'

interface DashboardFormCardProps {
  searchQuery: string
  statusFilter: 'all' | 'active' | 'inactive'
}

const DashboardFormCard = ({
  searchQuery,
  statusFilter,
}: DashboardFormCardProps) => {
  const { data: parents = [], isLoading } = useFetchAllParents()
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const filteredAndSortedParents = useMemo(() => {
    let result = [...parents]

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((parent) => {
        const status = Number(parent.status)
        return statusFilter === 'active' ? status === 1 : status === 0
      })
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (parent) =>
          parent.name.toLowerCase().includes(query) ||
          parent.email.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      } else {
        const statusA = Number(a.status)
        const statusB = Number(b.status)
        return sortOrder === 'asc' ? statusA - statusB : statusB - statusA
      }
    })

    return result
  }, [parents, searchQuery, statusFilter, sortBy, sortOrder])

  const toggleSort = (field: 'name' | 'status') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    )
  }

  if (filteredAndSortedParents.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <MaterialIcons name="search-off" size={48} color="#ffffff80" />
        <Typo className="text-white mt-4 text-center">
          {searchQuery
            ? 'No parents found matching your search'
            : statusFilter !== 'all'
              ? `No ${statusFilter} parents found`
              : 'No parents found'}
        </Typo>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <View className="flex-row justify-end mb-2 gap-2">
        <TouchableOpacity
          className="bg-white/10 px-3 py-2 rounded-lg flex-row items-center"
          onPress={() => toggleSort('name')}
        >
          <Typo className="text-white mr-2">Sort by Name</Typo>
          <MaterialIcons
            name={sortBy === 'name' ? 'sort' : 'sort'}
            size={20}
            color="#ffffff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white/10 px-3 py-2 rounded-lg flex-row items-center"
          onPress={() => toggleSort('status')}
        >
          <Typo className="text-white mr-2">Sort by Status</Typo>
          <MaterialIcons
            name={sortBy === 'status' ? 'sort' : 'sort'}
            size={20}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <FlashList
        data={filteredAndSortedParents}
        renderItem={({ item }) => <DashboardLists parent={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default DashboardFormCard
