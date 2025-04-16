import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { useFetchAllParents } from '@/hooks/admin/useFetchAllParents'
import DashboardLists from './DashboardLists'

const DashboardFormCard = () => {
  const { data: parents, isLoading } = useFetchAllParents()

  return (
    <View className="flex-1">
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlashList
          data={parents}
          renderItem={({ item }) => <DashboardLists parent={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
        />
      )}
    </View>
  )
}

export default DashboardFormCard
