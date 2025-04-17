import React from 'react'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

export const Icons = {
  dashboard: (props: any) => <AntDesign name="home" size={24} {...props} />,
  profile: (props: any) => <AntDesign name="user" size={24} {...props} />,
  addStudent: (props: any) => <AntDesign name="adduser" size={24} {...props} />,
  addParent: (props: any) => (
    <FontAwesome5 name={'user'} size={24} {...props} />
  ),
}
