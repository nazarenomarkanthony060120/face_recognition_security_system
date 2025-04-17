import { ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileFormHeader from './ProfileFormHeader'
import ProfileFormContents from './ProfileFormContents'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import { useAuth } from '@/context/auth'

const ProfileFormCard = () => {
  const auth = useAuth()

  const { data: userData, isLoading } = useFetchUserById({ id: auth.user?.uid })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <ProfileFormHeader />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ProfileFormContents user={userData} />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfileFormCard
