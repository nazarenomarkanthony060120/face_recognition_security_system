import { addStudent } from '@/api/user/addStudent'
import { useMutation } from '@tanstack/react-query'

export const useAddStudent = () => {
  return useMutation({
    mutationFn: addStudent,
  })
}
