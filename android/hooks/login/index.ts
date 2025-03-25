import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/api"
import { useRouter } from "expo-router"

export const useLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: loginUser, 
    onSuccess: () => {
      router.replace('/screens/dashboard')
    }
  })
}
