import React from 'react'
import AddParentHeader from './component/AddParentHeader'
import AddParentFooter from './component/AddParentFooter'
import AddParentFormCard from './component/AddParentFormCard'
import { ScrollView } from 'react-native'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddParent = () => {
  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-slate-800 justify-between p-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          <AddParentHeader />
          <AddParentFormCard />
          <AddParentFooter />
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default AddParent
