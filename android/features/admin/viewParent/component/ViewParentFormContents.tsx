import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import Input from '@/components/input'
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { getUserStatus } from '@/features/common/part/getUserStatus'
import { createdAtFormatted } from '@/features/common/part/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'

interface ViewParentFormContentsProps {
  parent: User | undefined
}

const ViewParentFormContents = ({ parent }: ViewParentFormContentsProps) => {
  const renderParent = (item: User) => (
    <SafeAreaView className="flex-1 mt-2">
      <View className="items-center mb-4">
        <Text className="text-2xl font-bold text-slate-200">{item.name}</Text>
      </View>
      <View className="gap-2">
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
          value={item.type}
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
      data={parent ? [parent] : []}
      renderItem={({ item }) => renderParent(item)}
      keyExtractor={(item) => item.id}
      estimatedItemSize={100}
    />
  )
}

export default ViewParentFormContents
