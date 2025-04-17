import React from 'react'
import Admin from '../Admin'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileHeader from './component/ProfileHeader'
import ProfileFooter from './component/ProfileFooter'
import { useAuth } from '@/context/auth'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import { ActivityIndicator } from 'react-native'

const Profile = () => {
  const auth = useAuth()

  const { data: userData, isLoading } = useFetchUserById({ id: auth.user?.uid })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isLoading) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else {
    content = (
      <>
        <ProfileHeader />
        <ProfileFormCard user={userData} />
        <ProfileFooter />
      </>
    )
  }

  return (
    <Admin className="flex-1 bg-slate-800 justify-between p-5">{content}</Admin>
  )
}

export default Profile
