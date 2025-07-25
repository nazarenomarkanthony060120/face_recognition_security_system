import { HistoryStatus } from '@/utils/types'

interface StudentLatestStatus {
  studentId: string
  status: HistoryStatus
  timestamp: any
}

interface Student {
  id: string
  name: string
  studentId: string
}

// Utility function to check attendance warnings for debugging
export const checkAttendanceWarnings = (
  students: Student[],
  attendanceStatus: StudentLatestStatus[]
) => {
  const now = new Date()
  const sixPM = new Date()
  sixPM.setHours(7, 0, 0, 0)

  console.log('=== Attendance Warning Debug ===')
  console.log(`Current time: ${now.toLocaleTimeString()}`)
  console.log(`Is after 6:00 PM: ${now >= sixPM}`)
  console.log(`Number of students: ${students?.length || 0}`)
  console.log(`Number of attendance records: ${attendanceStatus?.length || 0}`)

  if (!students || !attendanceStatus) {
    console.log('Missing data - no warnings will show')
    return []
  }

  const warnings = []

  for (const student of students) {
    const latestStatus = attendanceStatus.find(status => status.studentId === student.id)

    console.log(`\n--- Student: ${student.name} ---`)
    console.log(`Student ID: ${student.id}`)

    if (latestStatus) {
      console.log(`Latest status: ${latestStatus.status === HistoryStatus.IN ? 'IN' : latestStatus.status === HistoryStatus.OUT ? 'OUT' : 'UNKNOWN'}`)

      if (latestStatus.timestamp) {
        const recordDate = latestStatus.timestamp?.toDate?.() || new Date(latestStatus.timestamp)
        console.log(`Last record time: ${recordDate.toLocaleString()}`)

        const isToday = recordDate.getDate() === now.getDate() &&
          recordDate.getMonth() === now.getMonth() &&
          recordDate.getFullYear() === now.getFullYear()
        console.log(`Is from today: ${isToday}`)
      } else {
        console.log('No timestamp available')
      }

      const shouldWarn = latestStatus.status === HistoryStatus.OUT
      console.log(`Should warn: ${shouldWarn}`)

      if (shouldWarn) {
        warnings.push(student)
      }
    } else {
      console.log('No attendance record found')
    }
  }

  console.log(`\nTotal warnings: ${warnings.length}`)
  console.log('=== End Debug ===\n')

  return warnings
}

// Function to manually trigger a time check (useful for testing)
export const isCurrentlyAfter6PM = () => {
  const now = new Date()
  const sixPM = new Date()
  sixPM.setHours(18, 0, 0, 0)
  return now >= sixPM
}

// Function to check if a timestamp is from today
export const isTimestampFromToday = (timestamp: any) => {
  if (!timestamp) return true

  try {
    const recordDate = timestamp?.toDate?.() || new Date(timestamp)
    const today = new Date()

    return (
      recordDate.getDate() === today.getDate() &&
      recordDate.getMonth() === today.getMonth() &&
      recordDate.getFullYear() === today.getFullYear()
    )
  } catch (error) {
    return true
  }
} 