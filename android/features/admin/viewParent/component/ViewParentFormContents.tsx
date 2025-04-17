import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'

interface ViewParentFormContentsProps {
  parent: User | undefined
}

const ViewParentFormContents = ({ parent }: ViewParentFormContentsProps) => {
  const renderParent = (item: User) => (
    <SafeAreaView className="flex-1 mt-2">
      <View className="items-center">
        <Text className="text-2xl font-bold text-slate-200">{item.name}</Text>
      </View>
    </SafeAreaView>
  )

  return (
    <FlashList
      data={parent ? [parent] : []}
      renderItem={({ item }) => renderParent(item)}
      keyExtractor={(item) => item.id}
      estimatedItemSize={100}
    />
  )
}

export default ViewParentFormContents
