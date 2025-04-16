import React from 'react'
import Admin from '../Admin'
import DashboardFormCard from './component/DashboardFormCard'
import DashboardHeader from './component/DashboardHeader'

const Dashboard = () => {
  return (
    <Admin className="flex-1 bg-slate-800 justify-between p-5">
      <DashboardHeader />
      <DashboardFormCard />
    </Admin>
  )
}

export default Dashboard
