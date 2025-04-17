import React from 'react'
import { PERSON_ICON } from '@/constants/image'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/typo'
import { SafeAreaView } from 'react-native-safe-area-context'

const ViewParentFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center relative">
      <Typo className="text-3xl font-semibold text-slate-100 m-8">
        Parent Profile
      </Typo>
      <ImageWrapper
        className="rounded-full border-2 border-cyan-500 pb-10 px-10 pt-10"
        source={PERSON_ICON}
        style={{ height: 50, width: 50 }}
      />
    </SafeAreaView>
  )
}

export default ViewParentFormHeader
