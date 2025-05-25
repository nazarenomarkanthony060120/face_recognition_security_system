import { useQuery } from '@tanstack/react-query'
import { History, UserIdRequest } from '@/utils/types'
import { fetchHistory } from '@/api/common/fetchHistory'

export const fetchStudentHistoryById = ({id}: UserIdRequest) => {
  return useQuery<History[]>({
    queryKey: ['fetchHistory', id],
    queryFn: () => fetchHistory({id: id}),
  })
}
