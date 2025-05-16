import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
    <SafeAreaView className="gap-2 p-5">
      <AddParentFormHeader />
      {showCountdown && (
        <CountDown
          time={5}
          route={'/screens/(admin)/dashboard'}
          message="You will be redirected to Dashboard in"
          setShowCountdown={setShowCountdown}
        />
      )}
      <AddParentFormContents control={control} getValues={getValues} />
      <AddParentFormFooter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isPending={isPending}
      />
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </SafeAreaView>
  )
}

export default AddParentFormCard
