import { updateStatus } from '@/api/admin/updateStatus'
import { useMutation } from '@tanstack/react-query'

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: updateStatus,
  })
}
