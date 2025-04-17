import { useQuery } from '@tanstack/react-query'
import { Student, UserIdRequest } from '@/utils/types'
import { fetchAllStudents } from '@/api/common/fetchStudentById'

export const useFetchAllStudents = ({ id }: UserIdRequest) => {
  return useQuery<Student[]>({
    queryKey: ['students', id],
    queryFn: () => fetchAllStudents({ id }),
    refetchInterval: 2000,
    enabled: !!id,
  })
}