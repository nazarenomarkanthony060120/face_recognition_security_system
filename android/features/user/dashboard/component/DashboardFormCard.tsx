import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DashboardFormContents from './DashboardFormContents'

const DashboardFormCard = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <DashboardFormContents />
      </SafeAreaView>
    </ScrollView>
  )
}

export default DashboardFormCard
