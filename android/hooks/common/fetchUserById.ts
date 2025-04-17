import { fetchUserById } from '@/api/common/fetchUserById'
import { UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchUserById = ({ id }: UserIdRequest) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById({ id }),
  })
}
