import { View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io"
import Icon from '@/components/icon'

const { height } = Dimensions.get('screen')

const DashboardAddStudent = () => {
  return (
    <View className="absolute bottom-5 left-0 right-0 flex items-center">
      <TouchableOpacity className='flex relative justify-center items-center'>
        <Image 
          source={require("@/assets/images/loginBackground.jpg")}
          className="h-20 w-20 rounded-full border-red-400 border-4"
        />
        <Icon name="plus" className='absolute' size={30} color="black" />
        
      </TouchableOpacity>
    </View>
  )
}

export default DashboardAddStudent
