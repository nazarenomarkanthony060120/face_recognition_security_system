import React from 'react'
import Admin from '../Admin'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileHeader from './component/ProfileHeader'
import ProfileFooter from './component/ProfileFooter'

const Profile = () => {
  return (
    <Admin className="flex-1 bg-slate-100 justify-between p-5">
      <ProfileHeader />
      <ProfileFormCard />
      <ProfileFooter />
    </Admin>
  )
}

export default Profile
