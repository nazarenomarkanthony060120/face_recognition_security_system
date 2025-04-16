import React from 'react'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center relative">
      <ImageWrapper
        className="rounded-full border-2 border-slate-200 pb-10 px-10 pt-10"
        source={PERSON_ICON}
        style={{ height: 50, width: 50 }}
      />
    </SafeAreaView>
  )
}

export default ProfileFormHeader
