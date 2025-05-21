import React from 'react'
import Admin from '../Admin'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import ViewParentCard from './component/ViewParentCard'
import ViewParentHeader from './component/ViewParentHeader'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface ViewParentProps {
  params: URLSearchParams
}

const ViewParent = ({ params }: ViewParentProps) => {
  const parentId = params.get('id')
  const { data: parentData, isLoading } = useFetchUserById({ id: parentId })

  if (isLoading) return <LoadingIndicator />

  return (
    <Admin className="flex-1 bg-slate-800 justify-between">
      <ViewParentHeader />
      <ViewParentCard parent={parentData} />
    </Admin>
  )
}

export default ViewParent
