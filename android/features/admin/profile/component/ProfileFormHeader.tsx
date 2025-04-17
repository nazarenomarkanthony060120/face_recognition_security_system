import React from 'react'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_BLACK_ICON } from '@/constants/image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'

const ProfileFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center relative">
      <Typo className="text-3xl font-semibold text-slate-200 m-8">
        Personal Profile
      </Typo>
      <ImageWrapper
        className="rounded-full border-2 border-black bg-slate-300 pb-10 px-10 pt-10"
        source={PERSON_BLACK_ICON}
        style={{ height: 50, width: 50 }}
      />
    </SafeAreaView>
  )
}

export default ProfileFormHeader
