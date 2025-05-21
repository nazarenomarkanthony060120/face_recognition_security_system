import React from 'react'
import { useFetchStudentById } from '@/hooks/common/fetchStudentById'
import MyStudentHeader from './component/MyStudentHeader'
import MyStudentFormCard from './component/MyStudentFormCard'
import User from '../User'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native'

interface MyStudentProps {
  params: URLSearchParams
}

const MyStudent = ({ params }: MyStudentProps) => {
  const id = params.get('id')

  const { data: student, isLoading } = useFetchStudentById({ id: id })

  if (isLoading) return <LoadingIndicator />

  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <User className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <MyStudentHeader />
          <MyStudentFormCard student={student} />
        </ScrollView>
      </User>
    </LinearGradient>
  )
}

export default MyStudent
