import { View, Text } from 'react-native'
import React from 'react'
import User from '../User'
import ProfileHeader from './component/ProfileHeader'
import ProfileFooter from './component/ProfileFooter'
import ProfileFormCard from './component/ProfileFormCard'

const Profile = () => {
  return (
    <User className="flex-1 bg-slate-800 justify-between p-5">
      <ProfileHeader />
      <ProfileFormCard />
      <ProfileFooter />
    </User>
  )
}

export default Profile
