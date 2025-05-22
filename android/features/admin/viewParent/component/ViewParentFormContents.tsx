import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { getUserStatus } from '@/features/common/part/getUserStatus'
import { createdAtFormatted } from '@/features/common/part/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'
import { useUpdateStatus } from '@/hooks/admin/useUpdateStatus'

interface ViewParentFormContentsProps {
  parent: User | undefined
  onRefetch?: () => void
}

const ViewParentFormContents = ({
  parent,
  onRefetch,
}: ViewParentFormContentsProps) => {
  if (!parent) return null

  const { mutate: updateStatus, isPending } = useUpdateStatus()
  const isActive = getUserStatus(Number(parent.status)) === 'Active'

  const handleUpdateStatus = () => {
    if (!parent?.id) return
    updateStatus(
      { id: parent.id },
      {
        onSuccess: () => {
          onRefetch?.()
        },
        onError: () => {
          Alert.alert('Failed to update status')
        },
      },
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="gap-4">
        {/* Profile Header */}
        <View className="items-center mb-4">
          <Typo className="text-2xl font-bold text-white mb-1">
            {parent.name}
          </Typo>
          <View className="flex-row items-center gap-2">
            <View
              className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`}
            />
            <Typo
              className={`text-sm ${isActive ? 'text-green-400' : 'text-red-400'}`}
            >
              {getUserStatus(Number(parent.status))}
            </Typo>
          </View>
        </View>

        {/* Personal Information Section */}
        <View className="bg-white/10 p-4 rounded-xl border border-white/10">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="bg-white/20 p-3 rounded-full">
              <MaterialIcons name="person" size={24} color="#ffffff" />
            </View>
            <View>
              <Typo className="text-xl text-white font-bold">
                Personal Information
              </Typo>
              <Typo className="text-gray-400 text-sm">
                Basic details about the parent
              </Typo>
            </View>
          </View>
          <View className="gap-3">
            <View className="flex-row items-center gap-3 bg-white/5 p-3 rounded-xl">
              <MaterialIcons name="email" size={24} color="#ffffff" />
              <View className="flex-1">
                <Typo className="text-gray-400 text-sm">Email Address</Typo>
                <Typo className="text-white">{parent.email}</Typo>
              </View>
            </View>
            <View className="flex-row items-center gap-3 bg-white/5 p-3 rounded-xl">
              <MaterialIcons name="badge" size={24} color="#ffffff" />
              <View className="flex-1">
                <Typo className="text-gray-400 text-sm">Account Type</Typo>
                <Typo className="text-white">{parent.type}</Typo>
              </View>
            </View>
          </View>
        </View>

        {/* Account Information Section */}
        <View className="bg-white/10 p-4 rounded-xl border border-white/10">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="bg-white/20 p-3 rounded-full">
              <MaterialIcons name="info" size={24} color="#ffffff" />
            </View>
            <View>
              <Typo className="text-xl text-white font-bold">
                Account Information
              </Typo>
              <Typo className="text-gray-400 text-sm">
                Account status and details
              </Typo>
            </View>
          </View>
          <View className="gap-3">
            <View className="flex-row items-center gap-3 bg-white/5 p-3 rounded-xl">
              <MaterialIcons
                name="toggle-on"
                size={24}
                color={isActive ? '#4ade80' : '#f87171'}
              />
              <View className="flex-1">
                <Typo className="text-gray-400 text-sm">Account Status</Typo>
                <Typo
                  className={`${isActive ? 'text-green-400' : 'text-red-400'}`}
                >
                  {getUserStatus(Number(parent.status))}
                </Typo>
              </View>
            </View>
            <View className="flex-row items-center gap-3 bg-white/5 p-3 rounded-xl">
              <MaterialIcons name="calendar-today" size={24} color="#ffffff" />
              <View className="flex-1">
                <Typo className="text-gray-400 text-sm">Created At</Typo>
                <Typo className="text-white">
                  {createdAtFormatted(parent.createdAt as unknown as Timestamp)}
                </Typo>
              </View>
            </View>
          </View>
        </View>

        {/* Status Action Section */}
        <View className="bg-white/10 p-4 rounded-xl border border-white/10">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="bg-white/20 p-3 rounded-full">
              <MaterialIcons name="info" size={24} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">
                Account Status
              </Text>
              <Text
                className={`${isActive ? 'text-green-400' : 'text-red-400'} font-medium`}
              >
                {getUserStatus(Number(parent.status))}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleUpdateStatus}
              disabled={isPending}
              className={`px-4 py-2 rounded-lg ${
                isActive
                  ? 'bg-red-500/20 border border-red-500'
                  : 'bg-green-500/20 border border-green-500'
              } ${isPending ? 'opacity-50' : ''}`}
            >
              <Text
                className={`${
                  isActive ? 'text-red-500' : 'text-green-500'
                } font-semibold`}
              >
                {isPending
                  ? 'Updating...'
                  : isActive
                    ? 'Deactivate'
                    : 'Activate'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ViewParentFormContents
