import React from 'react'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileHeader from './component/ProfileHeader'
import ProfileFooter from './component/ProfileFooter'
import { useAuth } from '@/context/auth'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const auth = useAuth()

  const { data: userData, isLoading } = useFetchUserById({ id: auth.user?.uid })

  if (isLoading) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-slate-800 justify-between p-5">
        <ProfileHeader />
        <ProfileFormCard user={userData} />
        <ProfileFooter />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Profile
