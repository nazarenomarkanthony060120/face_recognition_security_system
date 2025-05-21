import React from 'react'
import User from '../User'
import DashboardHeader from './component/DashboardHeader'
import DashboardFormCard from './component/DashboardFormCard'
import { LinearGradient } from 'expo-linear-gradient'
import { SearchProvider } from './context/SearchContext'

const Dashboard = () => {
  return (
    <SearchProvider>
      <LinearGradient
        colors={['#1e3a8a', '#7c3aed']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <User className="flex-1 justify-between p-5">
          <DashboardHeader />
          <DashboardFormCard />
        </User>
      </LinearGradient>
    </SearchProvider>
  )
}

export default Dashboard
