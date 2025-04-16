import React from 'react'
import Admin from '../Admin'
import AddParentHeader from './component/AddParentHeader'
import AddParentFooter from './component/AddParentFooter'
import AddParentFormCard from './component/AddParentFormCard'

const AddParent = () => {
  return (
    <Admin className="flex-1 bg-slate-800 justify-between p-5">
      <AddParentHeader />
      <AddParentFormCard />
      <AddParentFooter />
    </Admin>
  )
}

export default AddParent
