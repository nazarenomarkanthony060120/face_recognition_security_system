import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileFormHeader from './ProfileFormHeader'
import ProfileFormContents from './ProfileFormContents'

const ProfileFormCard = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 p-5">
        <ProfileFormHeader />
        <ProfileFormContents />
      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfileFormCard
