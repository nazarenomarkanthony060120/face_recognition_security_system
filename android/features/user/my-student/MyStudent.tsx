import { ActivityIndicator } from 'react-native'
import React from 'react'
import { useFetchStudentById } from '@/hooks/common/fetchStudentById'
import MyStudentHeader from './component/MyStudentHeader'
import MyStudentFormCard from './component/MyStudentFormCard'
import User from '../User'

interface MyStudentProps {
  params: URLSearchParams
}

const MyStudent = ({ params }: MyStudentProps) => {
  const id = params.get('id')

  const { data: student, isLoading } = useFetchStudentById({ id: id })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isLoading) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else {
    content = (
      <>
        <MyStudentHeader />
        <MyStudentFormCard student={student} />
      </>
    )
  }

  return <User className="flex-1 bg-slate-800">{content}</User>
}

export default MyStudent
