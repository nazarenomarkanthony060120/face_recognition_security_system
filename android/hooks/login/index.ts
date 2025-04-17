import { loginUser } from '@/api/login'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  })
}
