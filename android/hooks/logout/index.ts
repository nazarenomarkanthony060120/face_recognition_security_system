import { logoutUser } from "@/api/logout"
import { useMutation } from "@tanstack/react-query"

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  })
}