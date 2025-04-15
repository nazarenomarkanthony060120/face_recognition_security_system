import React from 'react'
import User from '../User'
import DashboardHeader from './component/DashboardHeader'
import DashboardFormCard from './component/DashboardFormCard'

const Dashboard = () => {
  return (
    <User className="flex-1 bg-slate-800 justify-between p-5">
      <DashboardHeader />
      <DashboardFormCard />
    </User>
  )
}

export default Dashboard
