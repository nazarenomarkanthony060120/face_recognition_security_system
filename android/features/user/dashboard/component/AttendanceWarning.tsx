import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/typo'
import { useAuth } from '@/context/auth'
import { useFetchAllStudents } from '@/hooks/common/fetchStudentsById'
import { useFetchLatestAttendanceStatus } from '@/hooks/common/fetchLatestAttendance'
import { HistoryStatus } from '@/utils/types'

const AttendanceWarning = () => {
  const auth = useAuth()
  const { data: students } = useFetchAllStudents({ id: auth.user?.uid })
  const { data: attendanceStatus } = useFetchLatestAttendanceStatus({
    id: auth.user?.uid,
  })

  // Function to check if current time is after 6:00 PM
  const isAfter6PM = () => {
    const now = new Date()
    const sixPM = new Date()
    sixPM.setHours(1, 0, 0, 0) // 6:00 PM
    return now >= sixPM
  }

  // Function to check if timestamp is from today
  const isToday = (timestamp: any) => {
    if (!timestamp) return true // If no timestamp, assume it's relevant

    try {
      const recordDate = timestamp?.toDate?.() || new Date(timestamp)
      const today = new Date()

      return (
        recordDate.getDate() === today.getDate() &&
        recordDate.getMonth() === today.getMonth() &&
        recordDate.getFullYear() === today.getFullYear()
      )
    } catch (error) {
      return true // If error parsing, assume it's relevant
    }
  }

  // Get students who need warnings
  const getStudentsWithWarnings = () => {
    if (!students || !attendanceStatus || !isAfter6PM()) {
      return []
    }

    const warnings = []

    for (const student of students) {
      const latestStatus = attendanceStatus.find(
        (status) => status.studentId === student.id,
      )

      // Check if student is OUT and the record is from today
      if (
        latestStatus &&
        latestStatus.status === HistoryStatus.OUT &&
        isToday(latestStatus.timestamp)
      ) {
        warnings.push({
          ...student,
          latestStatus: latestStatus,
        })
      }
    }

    return warnings
  }

  const warningStudents = getStudentsWithWarnings()

  // Don't render if no warnings
  if (warningStudents.length === 0) {
    return null
  }

  return (
    <View className="mb-6">
      <View className="bg-red-500/20 p-5 rounded-2xl border border-red-500/30">
        {/* Header */}
        <View className="flex-row items-center gap-3 mb-4">
          <View className="bg-red-500/30 p-3 rounded-full">
            <MaterialIcons name="warning" size={24} color="#ef4444" />
          </View>
          <View>
            <Typo className="text-xl text-red-400 font-bold">
              Attendance Alert
            </Typo>
            <Typo className="text-red-300 text-sm">
              Students still out after 6:00 PM
            </Typo>
          </View>
        </View>

        {/* Warning List */}
        <View className="gap-3">
          {warningStudents.map((student, index) => (
            <View
              key={student.id}
              className="bg-red-500/10 p-4 rounded-xl border border-red-500/20"
            >
              <View className="flex-row items-center gap-3">
                <View className="bg-red-500/20 p-2 rounded-full">
                  <MaterialIcons name="person-off" size={20} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="warning" size={16} color="#ef4444" />
                    <Typo className="text-red-400 font-bold">
                      {student.name}, You're not in the room
                    </Typo>
                  </View>
                  <View className="mt-1">
                    <Typo className="text-red-300 text-sm">Status: Out</Typo>
                    <Typo className="text-red-300 text-sm">
                      Time: over 6:00 PM
                    </Typo>
                  </View>
                </View>
                <View className="bg-red-500/20 px-3 py-1 rounded-full">
                  <Typo className="text-red-400 text-xs font-medium">
                    ALERT
                  </Typo>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Footer Info */}
        <View className="mt-4 pt-4 border-t border-red-500/20">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="info" size={16} color="#fca5a5" />
            <Typo className="text-red-300 text-xs">
              This alert shows students who haven't checked in and it's past
              6:00 PM today
            </Typo>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AttendanceWarning
