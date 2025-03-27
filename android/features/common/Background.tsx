 import { View } from 'react-native'
import React from 'react'

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className='flex-1 bg-slate-900'>
      {children}
    </View>
  )
}

export default Background