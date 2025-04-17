import { ScrollView } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import ViewParentFormHeader from './ViewParentFormHeader'
import ViewParentFormContents from './ViewParentFormContents'
import ViewStutdents from '@/features/common/components/viewStudent/ViewStutdents'

interface ViewParentCardProps {
  parent: User | undefined
}

const ViewParentCard = ({ parent }: ViewParentCardProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <ViewParentFormHeader />
        <ViewParentFormContents parent={parent} />
        <ViewStutdents id={parent?.id} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default ViewParentCard
