import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import { FlashList } from '@shopify/flash-list'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'
import ViewLists from '@/features/common/components/viewLists/ViewLists'

const DashboardFormContents = () => {
  const auth = useAuth()
  const { data: students, isLoading } = useFetchAllStudents({
    id: auth.user?.uid,
  })

  return (
    <View className="flex-1">
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlashList
          data={students}
          renderItem={({ item }) => <ViewLists student={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
        />
      )}
    </View>
  )
}

export default DashboardFormContents
