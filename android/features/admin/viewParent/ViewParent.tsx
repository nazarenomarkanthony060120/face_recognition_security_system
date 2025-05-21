import React from 'react'
import Admin from '../Admin'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import ViewParentCard from './component/ViewParentCard'
import ViewParentHeader from './component/ViewParentHeader'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ViewParentProps {
  params: URLSearchParams
}

const ViewParent = ({ params }: ViewParentProps) => {
  const parentId = params.get('id')
  const { data: parentData, isLoading } = useFetchUserById({ id: parentId })

  if (isLoading) return <LoadingIndicator />

  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <Admin className="flex-1 justify-between">
          <ViewParentHeader />
          <ViewParentCard parent={parentData} />
        </Admin>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default ViewParent
