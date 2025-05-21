import React from 'react'
import { useFetchStudentById } from '@/hooks/common/fetchStudentById'
import MyStudentHeader from './component/MyStudentHeader'
import MyStudentFormCard from './component/MyStudentFormCard'
import User from '../User'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface MyStudentProps {
  params: URLSearchParams
}

const MyStudent = ({ params }: MyStudentProps) => {
  const id = params.get('id')

  const { data: student, isLoading } = useFetchStudentById({ id: id })

  if (isLoading) return <LoadingIndicator />

  return (
    <User className="flex-1 bg-slate-800">
      <MyStudentHeader />
      <MyStudentFormCard student={student} />
    </User>
  )
}

export default MyStudent
