import React from 'react'
import User from '../User'
import AddStudentHeader from './component/AddStudentHeader'
import AddStudentFooter from './component/AddStudentFooter'
import AddStudentFormCard from './component/AddStudentFormCard'
import { LinearGradient } from 'expo-linear-gradient'

const AddStudent = () => {
  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <User className="flex-1 p-5">
        <AddStudentHeader />
        <AddStudentFormCard />
        {/* <AddStudentFooter /> */}
      </User>
    </LinearGradient>
  )
}

export default AddStudent
