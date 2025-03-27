import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '@/components/icon'
import { View } from 'react-native'

const DashboardLogout = () => {
  return (
    <View className="absolute right-5 top-2">
      <TouchableOpacity className='flex relative justify-center items-center'>
        <Image 
          source={require("@/assets/images/loginBackground.jpg")}
          className="h-14 w-14 rounded-full border-red-400 border-4"
        />
        <Icon name="logout" className='absolute font-bold' size={14} color="black" />
        
      </TouchableOpacity>
    </View>
    // <TouchableOpacity className="absolute right-5 top-2">
    //   <Icon name="logout" size={56} color="black" />
    // </TouchableOpacity>
  )
}

export default DashboardLogout
