import { ScrollView, View } from 'react-native'
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
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'

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
    <View className="flex-1">
      <View className="bg-white/10 p-6 rounded-2xl border border-white/10">
        <View className="flex-row items-center gap-3 mb-6">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="person-add" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">
              Add New Student
            </Typo>
            <Typo className="text-gray-400 text-sm">
              Fill in the student details below
            </Typo>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView className="gap-4">
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
        </ScrollView>
      </View>
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </View>
  )
}

export default AddStudentFormCard
