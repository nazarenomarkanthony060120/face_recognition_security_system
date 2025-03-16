import { Stack } from "expo-router"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "../global.css"

const client = new QueryClient()

const RootLayout = () => {
  return (
    <QueryClientProvider client={client}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  )
}

export default RootLayout
