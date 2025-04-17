import React from 'react'
import User from '../User'
import AddStudentHeader from './component/AddStudentHeader'
import AddStudentFooter from './component/AddStudentFooter'
import AddStudentFormCard from './component/AddStudentFormCard'

const AddStudent = () => {
  return (
    <User className="flex-1 bg-slate-800 justify-between p-5">
      <AddStudentHeader />
      <AddStudentFormCard />
      <AddStudentFooter />
    </User>
  )
}

export default AddStudent
