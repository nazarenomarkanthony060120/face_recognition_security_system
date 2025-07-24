import { ActivityIndicator, View } from 'react-native'
import React, { useMemo } from 'react'
import { useAuth } from '@/context/auth'
import { FlashList } from '@shopify/flash-list'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'
import ViewLists from '@/features/common/components/viewLists/ViewLists'
import Typo from '@/components/typo'
import { useSearch } from '../context/SearchContext'

const DashboardFormContents = () => {
  const auth = useAuth()
  const { searchQuery } = useSearch()
  const { data: students, isLoading } = useFetchAllStudents({
    id: auth.user?.uid,
  })

  const filteredStudents = useMemo(() => {
    if (!students) return []
    if (!searchQuery) return students

    const query = searchQuery.toLowerCase()
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.studentId.toLowerCase().includes(query) 
    )
  }, [students, searchQuery])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color="#ffffff" />
        <Typo className="text-white mt-4">Loading students...</Typo>
      </View>
    )
  }

  if (!students?.length) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <Typo className="text-white text-lg">No students found</Typo>
        <Typo className="text-gray-400 mt-2">
          Add your first student to get started
        </Typo>
      </View>
    )
  }

  if (searchQuery && !filteredStudents.length) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <Typo className="text-white text-lg">No matching students found</Typo>
        <Typo className="text-gray-400 mt-2">Try a different search term</Typo>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <FlashList
        data={filteredStudents}
        renderItem={({ item }) => <ViewLists student={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

export default DashboardFormContents
