import React from 'react'
import { View } from 'react-native'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'

interface AddParentFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const AddParentFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: AddParentFormFooterProps) => {
  return (
    <View className="bg-white/10 rounded-xl p-4">
      <Button
        className="bg-white/20 items-center rounded-xl p-4 flex-row justify-center gap-2"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <MaterialIcons
          name={isPending ? 'hourglass-empty' : 'add-circle'}
          size={24}
          color="#ffffff"
        />
        <Typo className="text-white font-semibold text-lg">
          {isPending ? 'Creating Account...' : 'Create Account'}
        </Typo>
      </Button>
    </View>
  )
}

export default AddParentFormFooter
