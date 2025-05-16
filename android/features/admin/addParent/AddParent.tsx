import React from 'react'
import Admin from '../Admin'
import AddParentHeader from './component/AddParentHeader'
import AddParentFooter from './component/AddParentFooter'
import AddParentFormCard from './component/AddParentFormCard'
import { ScrollView } from 'react-native'

const AddParent = () => {
  return (
    <Admin className="flex-1 bg-slate-800 justify-between p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <AddParentHeader />
        <AddParentFormCard />
        <AddParentFooter />
      </ScrollView>
    </Admin>
  )
}

export default AddParent
