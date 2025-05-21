import React from 'react'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileHeader from './component/ProfileHeader'
import ProfileFooter from './component/ProfileFooter'
import { useAuth } from '@/context/auth'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const auth = useAuth()

  const { data: userData, isLoading } = useFetchUserById({ id: auth.user?.uid })

  if (isLoading) return <LoadingIndicator />

  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-4">
        <ProfileHeader />
        <ProfileFormCard user={userData} />
        <ProfileFooter />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Profile
