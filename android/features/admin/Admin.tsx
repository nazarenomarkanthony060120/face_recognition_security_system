import React from 'react'
import AdminLayout from './common/AdminLayout'

interface AdminProps {
  children: React.ReactNode
  className: string
}

const Admin = ({ children, className }: AdminProps) => {
  return <AdminLayout className={className}>{children}</AdminLayout>
}

export default Admin
