import { View } from 'react-native'
import React from 'react'
import { Student } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { getAllHistory } from '@/api/history/getAllHistory'
import { useQuery } from '@tanstack/react-query'

interface MyStudentFormContentsProps {
  student: Student | null | undefined
}

const MyStudentFormContents = ({ student }: MyStudentFormContentsProps) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: getAllHistory,
    enabled: !!student,
  })

  if (!student) return null

  // Filter and map the data
  const attendanceHistory = data
    .filter((record: any) => record.student_uid === student.id)
    .map((record: any) => {
      let statusText = 'Unknown'
      if (record.status === 1) statusText = 'Present'
      else if (record.status === 2) statusText = 'Absent'

      let date = ''
      let time = ''
      if (record.timestamp && record.timestamp.toDate) {
        const jsDate = record.timestamp.toDate()
        date = jsDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        time = jsDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      return {
        date,
        time,
        status: statusText,
        icon: record.status === 1 ? 'check-circle' : 'cancel',
        color: record.status === 1 ? '#4ade80' : '#f87171',
        location: 'Main Gate',
      }
    })

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white/10 p-4 rounded-xl border border-white/10">
        <View className="flex-row items-center gap-4 mb-4">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="badge" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-lg font-bold text-white">{student.name}</Typo>
            <Typo className="text-sm text-gray-400">{student.studentId}</Typo>
          </View>
        </View>

        <View className="flex-row items-center gap-4 mb-6">
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="school" size={24} color="#ffffff" />
          </View>
          <View>
            <Typo className="text-lg font-bold text-white">
              Grade & Section
            </Typo>
            <Typo className="text-sm text-gray-400">
              {student.gradeSection}
            </Typo>
          </View>
        </View>

        {/* Attendance History Section */}
        <View className="mt-4">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="bg-white/20 p-3 rounded-full">
              <MaterialIcons name="history" size={24} color="#ffffff" />
            </View>
            <View>
              <Typo className="text-lg font-bold text-white">
                Attendance History
              </Typo>
              <Typo className="text-sm text-gray-400">
                Recent attendance records
              </Typo>
            </View>
          </View>

          <View className="gap-3">
            {isLoading ? (
              <Typo className="text-white">Loading...</Typo>
            ) : attendanceHistory.length === 0 ? (
              <Typo className="text-white">No history found.</Typo>
            ) : (
              attendanceHistory.map((record, index) => (
                <View
                  key={index}
                  className="bg-white/10 p-4 rounded-xl border border-white/10"
                >
                  {/* Header Row */}
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center gap-3">
                      <View className="bg-white/20 p-2 rounded-full">
                        <MaterialIcons
                          name={record.icon as any}
                          size={20}
                          color={record.color}
                        />
                      </View>
                      <View>
                        <Typo className="text-white font-medium">
                          {record.status}
                        </Typo>
                        <Typo className="text-sm text-gray-400">
                          {record.date}
                        </Typo>
                      </View>
                    </View>
                    <View className="bg-white/10 px-3 py-1 rounded-full">
                      <Typo className="text-sm text-gray-400">{record.time}</Typo>
                    </View>
                  </View>

                  {/* Details Row */}
                  <View className="flex-row items-center gap-2 ml-12">
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color="#ffffff80"
                    />
                    <Typo className="text-sm text-gray-400">
                      {record.location}
                    </Typo>
                    <View className="w-1 h-1 rounded-full bg-gray-400" />
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyStudentFormContents
