import React from 'react'
import DashboardStudentList from './dashboardStudentList/DashboardStudentList'
import Background from '../common/Background'
import DashboardAddStudent from './dashboardAddStudent/DashboardAddStudent'
import { ScrollView, View } from 'react-native'
import DashboardHeader from './dashboardHeader/DashboardHeader'

const Dashboard = () => {
  return (
    <Background >
      <DashboardHeader header='List of Students' />
      <ScrollView>
        <View className='flex gap-4'>
          <DashboardStudentList />
          <DashboardStudentList />
          <DashboardStudentList />
          <DashboardStudentList />
        </View>
      </ScrollView>
      <DashboardAddStudent />
    </Background>
  )
}

export default Dashboard