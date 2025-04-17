import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'

const MyStudentFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center relative m-5">
      <ImageWrapper
        className="rounded-full border-2 border-slate-200 p-10"
        source={PERSON_ICON}
        style={{ height: 50, width: 50 }}
      />
    </SafeAreaView>
  )
}

export default MyStudentFormHeader
