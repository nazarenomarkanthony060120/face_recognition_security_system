import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createdAtFormatted } from '@/features/common/part/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'
import { getUserStatus } from '@/features/common/part/getUserStatus'
import Input from '@/components/input'
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'

interface ProfileFormContentsProps {
  user: User | undefined
}
const ProfileFormContents = ({ user }: ProfileFormContentsProps) => {
  const renderUser = (item: User) => (
    <SafeAreaView className="flex-1 mt-4">
      <View className="items-center">
        <Text className="text-2xl text-slate-200 font-bold">{item.name}</Text>
      </View>
      <View className="mt-5 gap-3">
        <Input
          className={'w-full py-3'}
          placeholder={'Parent Name'}
          value={item.email}
          secureTextEntry={false}
          isIconLeft
          editable={false}
          icon={<FontAwesome5 name={'user'} size={20} color="#00bdcf" />}
        />
        <Input
          className={'w-full py-3'}
          placeholder={'Parent Name'}
          value={getUserStatus(Number(item.status))}
          secureTextEntry={false}
          isIconLeft
          editable={false}
          icon={<AntDesign name={'infocirlceo'} size={20} color="#00bdcf" />}
        />
        <Input
          className={'w-full py-3'}
          placeholder={'Parent Name'}
          value={createdAtFormatted(item.createdAt as unknown as Timestamp)}
          secureTextEntry={false}
          isIconLeft
          editable={false}
          icon={<Ionicons name={'create-outline'} size={20} color="#00bdcf" />}
        />
      </View>
    </SafeAreaView>
  )

  return (
    <FlashList
      data={user ? [user] : []}
      renderItem={({ item }) => renderUser(item)}
      keyExtractor={(item) => item.id}
      estimatedItemSize={100}
    />
  )
}

export default ProfileFormContents
