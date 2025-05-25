import { View } from 'react-native'
import React from 'react'
import { Student } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { getHistory } from '@/api/history/getHistory'
import { useQuery } from '@tanstack/react-query'

interface MyStudentFormContentsProps {
  student: Student | null | undefined
}

interface AttendanceRecord {
  id: string
  timestamp?: { toDate: () => Date }
  status?: number
  student_uid?: string
}

const MyStudentFormContents = ({ student }: MyStudentFormContentsProps) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['history', student?.id],
    queryFn: () => student ? getHistory(student.id) : Promise.resolve([]),
    enabled: !!student,
  })

  if (!student) return null

  const attendanceHistory = data

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
              attendanceHistory.map((recordRaw, index) => {
                const record = recordRaw as AttendanceRecord
                // Format fields for display
                let date = ''
                let time = ''
                if (record.timestamp && record.timestamp.toDate) {
                  const jsDate = record.timestamp.toDate()
                  date = jsDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  time = jsDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
                let statusText = 'Unknown'
                let icon = 'help'
                let color = '#a3a3a3'
                if (record.status === 1) {
                  statusText = 'IN'
                  icon = 'check-circle'
                  color = '#4ade80'
                } else if (record.status === 2) {
                  statusText = 'OUT'
                  icon = 'cancel'
                  color = '#f87171'
                }
                const location = 'Main Gate'
                return (
                  <View
                    key={index}
                    className="bg-white/10 p-4 rounded-xl border border-white/10"
                  >
                    {/* Header Row */}
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center gap-3">
                        <View className="bg-white/20 p-2 rounded-full">
                          <MaterialIcons
                            name={icon as any}
                            size={20}
                            color={color}
                          />
                        </View>
                        <View>
                          <Typo className="text-white font-medium">
                            {statusText}
                          </Typo>
                          <Typo className="text-sm text-gray-400">
                            {date}
                          </Typo>
                        </View>
                      </View>
                      <View className="bg-white/10 px-3 py-1 rounded-full">
                        <Typo className="text-sm text-gray-400">{time}</Typo>
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
                        {location}
                      </Typo>
                      <View className="w-1 h-1 rounded-full bg-gray-400" />
                    </View>
                  </View>
                )
              })
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyStudentFormContents
