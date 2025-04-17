import { fetchStudentById } from "@/api/common/fetchStudentById"
import { Student, UserIdRequest } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"

export const useFetchStudentById = ({ id }: UserIdRequest) => {
  return useQuery<Student | null>({
    queryKey: ['student', id],
    queryFn: () => fetchStudentById({ id }),
  })
}
