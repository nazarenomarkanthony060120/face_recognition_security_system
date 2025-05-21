import React from 'react'
import DashboardFormCard from './component/DashboardFormCard'
import DashboardHeader from './component/DashboardHeader'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'

const Dashboard = () => {
  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-slate-800 justify-between p-5">
        <DashboardHeader />
        <DashboardFormCard />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Dashboard
