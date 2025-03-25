import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import DashboardStudent from '../dashboardStudent/DashboardStudent'
import DashboardAddStudent from '../dashboardAddStudent/DashboardAddStudent'

const DashboardStudentList = () => {
  return (
    <TouchableOpacity delayPressIn={10} className='flex-1'>
      <DashboardStudent />
    </TouchableOpacity>
  )
}

export default DashboardStudentList