import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signUp, signIn as login} from '@/api/index'

export const useAuth = () => {
  const queryClient = useQueryClient()

  // const { data: user } = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: getCurrentUser,
  //   staleTime: Infinity,
  // })

  const signIn = () => {
    return useMutation({
      mutationFn: login,
    })
  }

  const register = () => {
    return useMutation({
      mutationFn: signUp,
    })
  }


  return {
    signIn,
    register,
  }
}
