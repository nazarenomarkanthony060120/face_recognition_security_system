import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import Typo from '@/components/typo'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { ActivityIndicator } from 'react-native'

interface AddStudentFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const AddStudentFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: AddStudentFooterProps) => {
  if (isPending) {
    return (
      <SafeAreaView className="gap-3 mb-16">
        <Button className="bg-slate-300 items-center rounded-3xl gap-3 p-5">
          <ActivityIndicator />
          <Typo className="text-white">Add Student</Typo>
        </Button>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="gap-3 mb-16">
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

export default AddStudentFooter
