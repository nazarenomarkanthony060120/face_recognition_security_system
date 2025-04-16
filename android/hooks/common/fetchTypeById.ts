import { fetchTypeById } from '@/api/common/fetchTypeById'
import { useMutation } from '@tanstack/react-query'

export const useFetchTypeById = () => {
  return useMutation({
    mutationFn: fetchTypeById,
  })
}
