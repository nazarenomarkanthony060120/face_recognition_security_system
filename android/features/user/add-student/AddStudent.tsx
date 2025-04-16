import React, { useState } from 'react'
import User from '../User'
import AddStudentHeader from './component/AddStudentHeader'
import AddStudentFooter from './component/AddStudentFooter'
import AddStudentFormCard from './component/AddStudentFormCard'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useAddStudent } from '@/hooks/user/useAddUser'
import { AddStudent as AddStudentType } from '@/utils/types'
import { useAuth } from '@/context/auth'
import CountDown from '@/components/parts/CountDown'

const AddStudent = () => {
  const auth = useAuth()
  const [showCountdown, setShowCountdown] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { mutate: userAddStudent, isPending } = useAddStudent()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      userId: auth.user?.uid,
      studentId: data.studentId,
      name: data.name,
      gradeSection: data.gradeSection,
    }
    userAddStudent(formData as AddStudentType, {
      onSuccess: () => {
        setShowCountdown(true)
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }
  return (
    <User className="flex-1 bg-slate-800 justify-between p-5">
      <AddStudentHeader />
      <AddStudentFormCard control={control} />
      <AddStudentFooter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isPending={isPending}
      />
      {showCountdown && (
        <CountDown
          time={5}
          route={'/screens/(seller)/dashboard/store'}
          message="You will be redirected to your store in"
        />
      )}
    </User>
  )
}

export default AddStudent
