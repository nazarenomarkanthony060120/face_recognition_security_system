import React from 'react'
import Admin from '../Admin'
import { Text } from 'react-native'

const Dashboard = () => {
  return (
    <Admin className="flex-1 bg-slate-800 justify-between p-5">
      <Text className="text-2xl font-bold text-white">Admin Dashboard</Text>
    </Admin>
  )
}

export default Dashboard
