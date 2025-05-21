import React from 'react'
import AddParentHeader from './component/AddParentHeader'
import AddParentFooter from './component/AddParentFooter'
import AddParentFormCard from './component/AddParentFormCard'
import { ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddParent = () => {
  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <AddParentHeader />
          <AddParentFormCard />
          <AddParentFooter />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default AddParent
