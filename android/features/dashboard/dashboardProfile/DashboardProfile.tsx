import { TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import Icon from '@/components/icon'

const DashboardProfile = () => {
  return (
    <View className="absolute left-5 top-2">
      <TouchableOpacity className='flex relative justify-center items-center'>
        <Image 
          source={require("@/assets/images/loginBackground.jpg")}
          className="h-14 w-14 rounded-full border-red-400 border-4"
        />
        <Icon name="user" className='absolute' size={14} color="black" />
        
      </TouchableOpacity>
    </View>
  )
}

export default DashboardProfile