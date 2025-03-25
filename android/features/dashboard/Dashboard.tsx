import React from 'react'
import DashboardStudentList from './dashboardStudentList/DashboardStudentList'
import Background from '../common/Background'
import DashboardLogout from './dashboardLogout/DashboardLogout'
import DashboardAddStudent from './dashboardAddStudent/DashboardAddStudent'

const Dashboard = () => {
  return (
    <Background header='List of Students'>
      <DashboardStudentList />
      <DashboardStudentList />
      <DashboardStudentList />
    </Background>
  )
}

export default Dashboard