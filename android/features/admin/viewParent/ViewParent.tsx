import { ActivityIndicator } from 'react-native'
import React from 'react'
import Admin from '../Admin'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import ViewParentCard from './component/ViewParentCard'
import ViewParentHeader from './component/ViewParentHeader'

interface ViewParentProps {
  params: URLSearchParams
}

const ViewParent = ({ params }: ViewParentProps) => {
  const parentId = params.get('id')
  const { data: parentData, isLoading } = useFetchUserById({ id: parentId })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isLoading) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else {
    content = (
      <>
        <ViewParentHeader />
        <ViewParentCard parent={parentData} />
      </>
    )
  }

  return (
    <Admin className="flex-1 bg-slate-800 justify-between">{content}</Admin>
  )
}

export default ViewParent
