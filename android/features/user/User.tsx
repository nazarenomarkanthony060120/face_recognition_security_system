import React from 'react'
import UserLayout from './common/UserLayout'

interface UserProps {
  children?: React.ReactNode
  className: string
}

const User = ({ children, className }: UserProps) => {
  return <UserLayout className={className}>{children}</UserLayout>
}

export default User
