import { useQuery } from '@tanstack/react-query'
import { ParentType } from '@/utils/types'
import { fetchAllParents } from '@/api/admin/fetchParents'

export const useFetchAllParents = () => {
  return useQuery<ParentType[]>({
    queryKey: ['parents'],
    queryFn: () => fetchAllParents(),
    refetchInterval: 2000,
  })
}
