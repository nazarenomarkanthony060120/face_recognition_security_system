import React from 'react'
import MyStudent from '@/features/user/my-student/MyStudent'
import { useSearchParams } from 'expo-router/build/hooks'

const myStudent = () => {
  const params = useSearchParams()
  return <MyStudent params={params} />
}

export default myStudent
