import { ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DashboardFormContents from './DashboardFormContents'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'

const DashboardFormCard = () => {
  return (
    <View className="flex-1">
      <View className="bg-white/10 p-6 rounded-2xl border border-white/10">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="school" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-xl text-white font-bold">Student List</Typo>
            <Typo className="text-gray-400 text-sm">
              View and manage your students
            </Typo>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView className="gap-2">
            <DashboardFormContents />
          </SafeAreaView>
        </ScrollView>
      </View>
    </View>
  )
}

export default DashboardFormCard
