import React, { useContext, useEffect } from "react"
import { useRouter } from "expo-router"
import { AuthContext } from "@/context/auth"
import LoginScreen from "./screens/login"

const index = () => {
  const { user } = useContext(AuthContext) 
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace("/screens/dashboard")
    }
  }, [user, router])

  return <LoginScreen />
}

export default index
