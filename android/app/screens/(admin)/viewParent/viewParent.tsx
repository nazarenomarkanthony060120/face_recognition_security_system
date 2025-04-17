import React from 'react'
import ViewParent from '@/features/admin/viewParent/ViewParent'
import { useSearchParams } from 'expo-router/build/hooks'

const viewParent = () => {
  const param = useSearchParams()
  return <ViewParent params={param} />
}

export default viewParent
