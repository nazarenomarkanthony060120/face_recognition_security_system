import { View } from 'react-native'
import React, { useState } from 'react'
import AddParentFormContents from './AddParentFormContents'
import AddParentFormHeader from './AddParentFormHeader'
import AddParentFormFooter from './AddParentFormFooter'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useAdminParentRegister } from '@/hooks/admin/useAdminParentRegister'
import { RegisterParentType } from '@/utils/types'
import CountDown from '@/components/parts/CountDown'
import Error from '@/components/parts/Error'

const AddParentFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm()

  const { mutate: register, isPending } = useAdminParentRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    register(data as RegisterParentType, {
      onSuccess: () => {
        setShowCountdown(true)
        reset()
      },
    })
  }

  return (
    <View className="bg-white/10 rounded-xl border border-white/10 p-6 mb-6">
      <AddParentFormHeader />
      {showCountdown && (
        <CountDown
          time={5}
          route={'/screens/(admin)/dashboard/dashboard'}
          message="You will be redirected to Dashboard in"
          setShowCountdown={setShowCountdown}
        />
      )}
      <View className="mt-6">
        <AddParentFormContents control={control} getValues={getValues} />
      </View>
      <View className="mt-8">
        <AddParentFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </View>
      {Object.keys(errors).length > 0 && (
        <View className="mt-4">
          <Error errors={errors} />
        </View>
      )}
    </View>
  )
}

export default AddParentFormCard
