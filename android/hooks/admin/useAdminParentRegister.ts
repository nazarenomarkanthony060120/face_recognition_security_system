import { registerParent } from '@/api/admin/registerParent'
import { useMutation } from '@tanstack/react-query'

export const useAdminParentRegister = () => {
  return useMutation({
    mutationFn: registerParent,
  })
}
