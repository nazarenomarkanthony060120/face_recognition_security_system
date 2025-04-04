import React, { useContext, useEffect } from "react"
import { useRouter } from "expo-router"
import { AuthContext } from "@/context/auth"
import LoginScreen from "./screens/login"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const index = () => {
  const { user } = useContext(AuthContext) 
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace("/screens/dashboard")
    }
  }, [user, router])

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <LoginScreen />
    </QueryClientProvider>
  )
}

export default index
