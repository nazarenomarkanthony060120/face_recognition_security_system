import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddStudentFormHeader from './AddStudentFormHeader'
import AddStudentFormContents from './AddStudentFormContents'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import AddStudentFormFooter from './AddStudentFormFooter'
import { AddStudent } from '@/utils/types'
import CountDown from '@/components/parts/CountDown'
import Error from '@/components/parts/Error'
import { useAddStudentRegister } from '@/hooks/user/useAddStudent'
import { useAuth } from '@/context/auth'

const AddStudentFormCard = () => {
  const auth = useAuth()
  const [isCreate, setIsCreate] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const { mutate: addStudent, isPending, error } = useAddStudentRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsCreate(true)
    const formData = {
      id: auth.user?.uid,
      studentId: data.studentId,
      name: data.name,
      gradeSection: data.gradeSection,
    }

    addStudent(formData as AddStudent, {
      onSuccess: () => {
        setShowCountdown(true)
        reset()
        setIsCreate(false)
      },
      onError: () => {
        console.log(error, ' ohshit')
      },
    })
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 p-5">
        <AddStudentFormHeader />
        {showCountdown && (
          <CountDown
            time={5}
            route={'/screens/(user)/dashboard'}
            message="You will be redirected to Dashboard in"
            setShowCountdown={setShowCountdown}
          />
        )}
        <AddStudentFormContents control={control} />
        <AddStudentFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
          isCreate={isCreate}
        />
      </SafeAreaView>
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </ScrollView>
  )
}

export default AddStudentFormCard
