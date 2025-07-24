import React from 'react'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { ActivityIndicator, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

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
      <SafeAreaView className="mt-6">
        <Button className="bg-white/10 items-center rounded-xl p-4 border border-white/10">
          <View className="flex-row items-center gap-2">
            <ActivityIndicator color="#ffffff" />
            <Typo className="text-white">Adding Boarder...</Typo>
          </View>
        </Button>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="mt-6">
      <Button
        className="bg-white/10 items-center rounded-xl p-4 border border-white/10"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="person-add" size={20} color="#ffffff" />
          <Typo className="text-white">Add Boarder</Typo>
        </View>
      </Button>
    </SafeAreaView>
  )
}

export default AddStudentFormFooter
