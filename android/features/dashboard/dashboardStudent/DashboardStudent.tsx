import { View, Image } from 'react-native'
import React from 'react'
import Typo from '@/components/typo'

const DashboardStudent = () => {
  return (
    <View className='h-32 flex-row bg-sky-300 rounded-lg gap-3 px-3 py-3'>
      <Image 
        source={require("@/assets/images/loginBackground.jpg")}
        className='h-full rounded-lg w-24'
      />
      <View>
        <Typo className='font-bold'>Student Test</Typo>
        <Typo>ID: 1231231</Typo>
        <Typo>Grade: 2</Typo>
        <Typo>Yr: 2023</Typo>
      </View>
    </View>
  )
}

export default DashboardStudent