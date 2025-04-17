import React from 'react'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { ActivityIndicator } from 'react-native'

interface AddStudentFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
  isCreate: boolean
}

const AddStudentFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
  isCreate,
}: AddStudentFormFooterProps) => {
  if (isCreate) {
    return (
      <SafeAreaView className="gap-3">
        <Button className="bg-slate-300 items-center rounded-3xl gap-3 p-5">
          <ActivityIndicator />
          <Typo className="text-white">Add Student</Typo>
        </Button>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="gap-3">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <Typo className="text-white">Add Student</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default AddStudentFormFooter
