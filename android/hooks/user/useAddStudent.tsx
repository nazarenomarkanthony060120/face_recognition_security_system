import { addStudentRegister } from '@/api/user/addStudentRegister'
import { useMutation } from '@tanstack/react-query'

export const useAddStudentRegister = () => {
  return useMutation({
    mutationFn: addStudentRegister,
  })
}
