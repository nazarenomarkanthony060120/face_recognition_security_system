import { View, ScrollView } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import { createdAtFormatted } from '@/features/common/part/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'
import { getUserStatus } from '@/features/common/part/getUserStatus'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'
import { PERSON_BLACK_ICON } from '@/constants/image'
import ImageWrapper from '@/components/parts/Image'

interface ProfileFormContentsProps {
  user: User | undefined
}

const ProfileFormContents = ({ user }: ProfileFormContentsProps) => {
  if (!user) return null

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1">
        <View className="items-center mb-8">
          <View className="bg-white/20 p-4 rounded-full mb-4 border-2 border-white/10">
            <ImageWrapper
              source={PERSON_BLACK_ICON}
              style={{ height: 80, width: 80 }}
            />
          </View>
          <Typo className="text-3xl text-white font-bold mb-1">
            {user.name}
          </Typo>
          <Typo className="text-gray-400 text-lg">{user.email}</Typo>
        </View>

        <View className="gap-4">
          <View className="bg-white/10 p-4 rounded-xl border border-white/5">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="bg-white/10 p-2 rounded-lg">
                <MaterialIcons name="email" size={24} color="#ffffff" />
              </View>
              <Typo className="text-gray-400 text-base">Email Address</Typo>
            </View>
            <Typo className="text-white text-lg ml-12">{user.email}</Typo>
          </View>

          <View className="bg-white/10 p-4 rounded-xl border border-white/5">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="bg-white/10 p-2 rounded-lg">
                <MaterialIcons name="info" size={24} color="#ffffff" />
              </View>
              <Typo className="text-gray-400 text-base">Account Status</Typo>
            </View>
            <View className="flex-row items-center ml-12">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${
                  Number(user.status) === 1 ? 'bg-green-400' : 'bg-red-400'
                }`}
              />
              <Typo
                className={`text-lg ${
                  Number(user.status) === 1 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {getUserStatus(Number(user.status))}
              </Typo>
            </View>
          </View>

          <View className="bg-white/10 p-4 rounded-xl border border-white/5">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="bg-white/10 p-2 rounded-lg">
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color="#ffffff"
                />
              </View>
              <Typo className="text-gray-400 text-base">Account Created</Typo>
            </View>
            <Typo className="text-white text-lg ml-12">
              {createdAtFormatted(user.createdAt as unknown as Timestamp)}
            </Typo>
          </View>

          <View className="bg-white/10 p-4 rounded-xl border border-white/5">
            <View className="flex-row items-center gap-3 mb-2">
              <View className="bg-white/10 p-2 rounded-lg">
                <MaterialIcons
                  name="admin-panel-settings"
                  size={24}
                  color="#ffffff"
                />
              </View>
              <Typo className="text-gray-400 text-base">Role</Typo>
            </View>
            <View className="flex-row items-center ml-12">
              <View className="bg-blue-500/20 px-3 py-1 rounded-full">
                <Typo className="text-blue-400">Administrator</Typo>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileFormContents
