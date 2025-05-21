import React from 'react'
import { View } from 'react-native'
import { User } from '@/utils/types'
import ProfileFormContents from './ProfileFormContents'

interface ProfileFormCardProps {
  user: User | undefined
}

const ProfileFormCard = ({ user }: ProfileFormCardProps) => {
  return (
    <View className="flex-1">
      <View className="bg-white/10 rounded-xl border border-white/10 p-6">
        <ProfileFormContents user={user} />
      </View>
    </View>
  )
}

export default ProfileFormCard
