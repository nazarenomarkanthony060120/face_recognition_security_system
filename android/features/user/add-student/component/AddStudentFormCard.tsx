import { ScrollView } from 'react-native'
import React from 'react'
import { Control, FieldValues } from 'react-hook-form'
import Input from '@/components/input'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddStudentFormHeader from './AddStudentFormHeader'
import AddStudentFormContents from './AddStudentFormContents'

interface AddStudentFormCardProps {
  control: Control<FieldValues>
}

const AddStudentFormCard = ({ control }: AddStudentFormCardProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="mt-16">
      <SafeAreaView className="gap-2 p-5">
        <AddStudentFormHeader />
        <AddStudentFormContents control={control} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default AddStudentFormCard
