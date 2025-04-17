import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileFormHeader from './ProfileFormHeader'
import ProfileFormContents from './ProfileFormContents'
import { User } from '@/utils/types'

interface ProfileFormCardProps {
  user: User | undefined
}

const ProfileFormCard = ({ user }: ProfileFormCardProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 mt-10">
        <ProfileFormHeader />
        <ProfileFormContents user={user} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfileFormCard
