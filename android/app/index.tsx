import Button from '@/components/button'
import Footer from '@/components/parts/Footer'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/typo'
import { SPLASH_ICON } from '@/constants/image'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '@/context/auth'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import { getUserRoutes } from '@/features/common/part/getUserRoutes'

const index = () => {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch user data only if user is authenticated
  const { data: userData, isLoading: userDataLoading } = useFetchUserById({
    id: user?.uid,
  })

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Wait for auth to finish loading
        if (loading) return

        // If user is authenticated, get their type and redirect to appropriate dashboard
        if (user) {
          // Wait for user data to load to determine user type
          if (!userDataLoading && userData) {
            const route = getUserRoutes({ type: userData.type })
            router.replace(route)
            return
          }
        } else {
          // User is not authenticated, show splash screen
          setIsLoading(false)
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to initialize app'),
        )
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [user, loading, userData, userDataLoading, router])

  const navigateToLogin = () => {
    try {
      router.push('/(auth)/login')
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Navigation failed'))
    }
  }

  // Show loading while auth is initializing or user data is loading
  if (loading || (user && userDataLoading) || isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-800 items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Typo className="text-white mt-4">Loading...</Typo>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-slate-800 items-center justify-center px-10">
        <Typo className="text-white text-center mb-4">
          Error: {error.message}
        </Typo>
        <Button
          className="bg-cyan-500 items-center rounded-3xl p-5"
          onPress={() => setIsLoading(true)}
        >
          <Typo className="text-white">Retry</Typo>
        </Button>
      </SafeAreaView>
    )
  }

  // Only show splash screen for unauthenticated users
  return (
    <LinearGradient
      colors={['#1e3a8a', '#7c3aed']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="min-h-screen px-8 py-10">
            <View className="items-center justify-center mb-10">
              <View className="bg-white/10 p-8 rounded-3xl border border-white/10">
                <ImageWrapper
                  source={SPLASH_ICON}
                  style={{ height: 220, width: 170 }}
                  onError={(e) =>
                    setError(new Error('Failed to load splash image'))
                  }
                />
              </View>
            </View>

            <View className="flex-1">
              <View className="gap-6 mb-5">
                <View>
                  <Typo className="text-center text-3xl font-bold text-white mb-2">
                    Face Recognition Security System
                  </Typo>
                </View>
                <View className="bg-white/10 p-6 rounded-2xl border border-white/10">
                  <Typo className="text-center text-base text-gray-200 leading-7">
                    Experience seamless, secure access with our advanced face
                    recognition technology. Our boarding house system provides
                    contactless entry, real-time monitoring, and enhanced
                    security for your students' safety and convenience.
                  </Typo>
                </View>
              </View>

              <Footer className="flex gap-4">
                <Button
                  className="bg-white/20 items-center rounded-xl p-5 border border-white/10 flex-row justify-center gap-3"
                  onPress={navigateToLogin}
                >
                  <Typo className="text-white font-semibold text-lg">
                    Get Started
                  </Typo>
                </Button>
              </Footer>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default index
