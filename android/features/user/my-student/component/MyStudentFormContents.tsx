import { View } from 'react-native'
import React from 'react'
import { HistoryStatusText, Student } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { fetchStudentHistoryById } from '@/hooks/common/fetchStudentHistoryById'
import { getHistoryStatus } from '@/features/common/part/getHistoryStatus'
import { Timestamp } from 'firebase/firestore'
import { createdAtFormatted } from '@/features/common/part/getCreatedAtFormatted'
import { getTimeFormatted } from '@/features/common/part/getTimeFormatted'

interface MyStudentFormContentsProps {
  student: Student | null | undefined
}

const MyStudentFormContents = ({ student }: MyStudentFormContentsProps) => {
  if (!student) return null

  console.log('MyStudentFormContents - Student object:', student)
  console.log('MyStudentFormContents - Student ID being passed:', student.id)

  const { data: fetchHistory, isLoading } = fetchStudentHistoryById({
    id: student.id,
  })

  console.log('MyStudentFormContents - fetchHistory result:', fetchHistory)
  console.log('MyStudentFormContents - isLoading:', isLoading)

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
            {fetchHistory?.length === 0 && (
              <Typo className="text-sm text-gray-400">
                No attendance records found
              </Typo>
            )}
            {fetchHistory?.map((record, index) => (
              <View
                key={index}
                className="bg-white/10 p-4 rounded-xl border border-white/10"
              >
                {/* Header Row */}
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="bg-white/20 p-2 rounded-full">
                      <MaterialIcons
                        name={
                          getHistoryStatus({ status: record.status }) ===
                          HistoryStatusText.IN
                            ? 'check-circle'
                            : 'close'
                        }
                        size={20}
                        color={
                          getHistoryStatus({ status: record.status }) ===
                          HistoryStatusText.IN
                            ? '#4ade80'
                            : '#eb4034'
                        }
                      />
                    </View>
                    <View>
                      <Typo className="text-white font-medium">
                        {getHistoryStatus({ status: record.status })}
                      </Typo>
                      <Typo className="text-sm text-gray-400">
                        {getTimeFormatted(
                          record.timestamp as unknown as Timestamp,
                        )}
                      </Typo>
                    </View>
                  </View>
                  <View className="bg-white/10 px-3 py-1 rounded-full">
                    <Typo className="text-sm text-gray-400">
                      {createdAtFormatted(
                        record.timestamp as unknown as Timestamp,
                      )}
                    </Typo>
                  </View>
                </View>

                {/* Details Row */}
                <View className="flex-row items-center gap-4 ml-12">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color="#ffffff80"
                    />
                    <Typo className="text-sm text-gray-400">Main Gate</Typo>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyStudentFormContents
