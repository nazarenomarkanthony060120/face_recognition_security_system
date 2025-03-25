import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const DashboardLogout = () => {
  
  return (
    <TouchableOpacity className='absolute right-5 top-2'>
      <Image 
        source={require("@/assets/images/loginBackground.jpg")}
        className="h-14 w-14 rounded-full"
      />
    </TouchableOpacity>
  )
}

export default DashboardLogout