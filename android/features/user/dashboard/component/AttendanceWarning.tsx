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
  const { data: students } = useFetchAllStudents({ id: auth.getUserId?.() })
  const { data: attendanceStatus } = useFetchLatestAttendanceStatus({
    id: auth.getUserId?.(),
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
    if (!students || !attendanceStatus || !isAfter6PM()) return []

    return students.filter((student) => {
      const studentStatus = attendanceStatus.find(
        (status) => status.studentId === student.studentId,
      )

      if (!studentStatus || !isToday(studentStatus.timestamp)) return true

      // Check if student hasn't returned after going out
      return studentStatus.status === HistoryStatus.OUT
    })
  }

  const studentsWithWarnings = getStudentsWithWarnings()

  // Don't show warning if no students or if it's not after 6 PM
  if (!isAfter6PM() || studentsWithWarnings.length === 0) {
    return null
  }

  return (
    <View className="mb-6">
      <View className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4">
        <View className="flex-row items-center mb-3">
          <MaterialIcons name="warning" size={24} color="#F59E0B" />
          <Typo className="text-amber-400 font-semibold ml-2 text-lg">
            Attendance Warning
          </Typo>
        </View>

        <Typo className="text-gray-300 mb-3">
          The following students have not returned to the boarding house after
          6:00 PM:
        </Typo>

        <View className="space-y-2">
          {studentsWithWarnings.slice(0, 5).map((student) => (
            <View
              key={student.id}
              className="flex-row items-center bg-amber-500/10 rounded-lg p-3"
            >
              <MaterialIcons name="person" size={20} color="#F59E0B" />
              <View className="ml-3 flex-1">
                <Typo className="text-white font-medium">{student.name}</Typo>
                <Typo className="text-gray-400 text-sm">
                  ID: {student.studentId}
                </Typo>
              </View>
              <MaterialIcons name="arrow-forward" size={16} color="#F59E0B" />
            </View>
          ))}

          {studentsWithWarnings.length > 5 && (
            <View className="bg-amber-500/10 rounded-lg p-3 items-center">
              <Typo className="text-amber-400 font-medium">
                +{studentsWithWarnings.length - 5} more students
              </Typo>
            </View>
          )}
        </View>

        <View className="mt-4 pt-3 border-t border-amber-500/20">
          <Typo className="text-gray-400 text-sm text-center">
            Please check on these students or contact them directly.
          </Typo>
        </View>
      </View>
    </View>
  )
}

export default AttendanceWarning
