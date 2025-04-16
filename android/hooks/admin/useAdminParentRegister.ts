import { registerParent } from '@/api/admin/registerParent'
import { useMutation } from '@tanstack/react-query'

export const useAminParentRegister = () => {
  return useMutation({
    mutationFn: registerParent,
  })
}
