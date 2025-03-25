import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

const DashboardProfile = () => {
  return (
    <TouchableOpacity className='absolute left-5 top-2'>
      <Image 
        source={require("@/assets/images/loginBackground.jpg")}
        className="h-14 w-14 rounded-full"
      />
    </TouchableOpacity>
  )
}

export default DashboardProfile