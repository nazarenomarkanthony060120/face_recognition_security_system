import { useQuery } from '@tanstack/react-query'
import { db } from '@/lib/firestore'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { History, HistoryStatus, UserIdRequest } from '@/utils/types'

interface StudentLatestStatus {
  studentId: string
  status: HistoryStatus
  timestamp: any
}

export const useFetchLatestAttendanceStatus = ({ id }: UserIdRequest) => {
  return useQuery<StudentLatestStatus[]>({
    queryKey: ['latestAttendanceStatus', id],
    queryFn: async () => {
      if (!id) return []

      // First, get all students for this parent
      const studentsQuery = query(
        collection(db, 'students'),
        where('parentId', '==', id)
      )
      const studentsSnapshot = await getDocs(studentsQuery)
      const students = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        studentId: doc.data().studentId
      }))

      // Then get the latest attendance status for each student
      const latestStatuses: StudentLatestStatus[] = []

      for (const student of students) {
        try {
          // Get the most recent history record for this student
          const historyQuery = query(
            collection(db, 'history'),
            where('student_uid', '==', student.id),
            orderBy('timestamp', 'desc'),
            limit(1)
          )
          const historySnapshot = await getDocs(historyQuery)

          if (!historySnapshot.empty) {
            const latestRecord = historySnapshot.docs[0].data() as History
            latestStatuses.push({
              studentId: student.id,
              status: latestRecord.status,
              timestamp: latestRecord.timestamp
            })
          }
          // Don't add students with no history records
        } catch (error) {
          // Fallback without orderBy for composite index issues
          const historyQuery = query(
            collection(db, 'history'),
            where('student_uid', '==', student.id)
          )
          const historySnapshot = await getDocs(historyQuery)
          console.log('historySnapshot', historySnapshot)
          if (!historySnapshot.empty) {
            // Sort on client side and get the latest
            const records = historySnapshot.docs.map(doc => doc.data() as History)
            const sortedRecords = records.sort((a, b) => {
              const timestampA = (a.timestamp as any)?.toDate?.() || new Date(a.timestamp as any)
              const timestampB = (b.timestamp as any)?.toDate?.() || new Date(b.timestamp as any)
              return timestampB.getTime() - timestampA.getTime()
            })

            latestStatuses.push({
              studentId: student.id,
              status: sortedRecords[0].status,
              timestamp: sortedRecords[0].timestamp
            })
          }
          // Don't add students with no history records
        }
      }

      return latestStatuses
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  })
} 