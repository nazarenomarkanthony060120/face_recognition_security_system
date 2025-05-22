import { ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { User } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import ViewParentFormHeader from './ViewParentFormHeader'
import ViewParentFormContents from './ViewParentFormContents'
import ViewStutdents from '@/features/common/components/viewStudent/ViewStutdents'

interface ViewParentCardProps {
  parent: User | undefined
  onRefetch?: () => void
}

const ViewParentCard = ({ parent, onRefetch }: ViewParentCardProps) => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await onRefetch?.()
    setRefreshing(false)
  }

  return (
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
      <SafeAreaView className="gap-2">
        <ViewParentFormHeader />
        <ViewParentFormContents parent={parent} onRefetch={onRefetch} />
        <ViewStutdents id={parent?.id} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default ViewParentCard
