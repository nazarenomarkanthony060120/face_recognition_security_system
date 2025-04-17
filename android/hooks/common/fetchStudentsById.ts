import { useQuery } from '@tanstack/react-query'
import { Student, UserIdRequest } from '@/utils/types'
import { fetchAllStudents } from '@/api/common/fetchStudentsById'

export const useFetchAllStudents = ({ id }: UserIdRequest) => {
  return useQuery<Student[]>({
    queryKey: ['students', id],
    queryFn: () => fetchAllStudents({ id }),
  })
}