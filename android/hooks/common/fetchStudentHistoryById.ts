import { useQuery } from '@tanstack/react-query'
import { getHistory } from '@/api/history/getHistory'

export const fetchStudentHistoryById = (studentId?: string | null) => {
  return useQuery({
    queryKey: ['history', studentId],
    queryFn: () => (studentId ? getHistory(studentId) : Promise.resolve([])),
    enabled: !!studentId,
  })
} 