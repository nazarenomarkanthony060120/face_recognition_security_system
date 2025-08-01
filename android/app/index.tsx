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
import { getUserRoutes } from '@/features/common/part/getUserRoutes'
import { UserType } from '@/utils/types'
import {
  sendDiscordErrorNotification,
  createErrorNotification,
} from '@/utils/discordNotification'
import { logToDiscord } from '@/utils/discordLogger'

const index = () => {
  const router = useRouter()
  const {
    loading,
    isVerified,
    authSession,
    isInitialized,
    user,
    clearInvalidSession,
  } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        logToDiscord.log(
          '🚀 App initialization started',
          'index.tsx',
          'initializeApp',
        )
        logToDiscord.log(
          `Auth state: loading=${loading}, isInitialized=${isInitialized}, hasUser=${!!user}, userEmail=${user?.email}, isVerified=${isVerified}, hasAuthSession=${!!authSession}, sessionUserType=${authSession?.userType}`,
          'index.tsx',
          'initializeApp',
        )

        // Wait for auth to finish loading and initialization to complete
        if (loading || !isInitialized) {
          logToDiscord.log(
            '⏳ Waiting for auth initialization...',
            'index.tsx',
            'initializeApp',
          )
          return
        }

        logToDiscord.log(
          '✅ Auth initialization complete',
          'index.tsx',
          'initializeApp',
        )

        // Check for auto login: prioritize session state as source of truth
        if (isVerified && authSession && authSession.userType) {
          logToDiscord.log(
            '🎯 Auto login conditions met!',
            'index.tsx',
            'autoLogin',
          )
          logToDiscord.log(
            `- Session verified: ${isVerified}`,
            'index.tsx',
            'autoLogin',
          )
          logToDiscord.log(
            `- Session exists: ${!!authSession}`,
            'index.tsx',
            'autoLogin',
          )
          logToDiscord.log(
            `- User type: ${authSession.userType}`,
            'index.tsx',
            'autoLogin',
          )
          logToDiscord.log(
            `- User type typeof: ${typeof authSession.userType}`,
            'index.tsx',
            'autoLogin',
          )
          logToDiscord.log(
            `- Session expiry: ${new Date(authSession.sessionExpiry).toLocaleString()}`,
            'index.tsx',
            'autoLogin',
          )
          logToDiscord.log(
            `- Firebase user status: ${!!user} (not required for auto-login)`,
            'index.tsx',
            'autoLogin',
          )

          // Validate userType against enum values
          const validUserTypes = Object.values(UserType)
          if (!validUserTypes.includes(authSession.userType as UserType)) {
            logToDiscord.error(
              `❌ Invalid user type in session: ${authSession.userType}`,
              'index.tsx',
              'autoLogin',
            )
            logToDiscord.error(
              `❌ Valid types are: ${validUserTypes.join(', ')}`,
              'index.tsx',
              'autoLogin',
            )
            logToDiscord.log(
              '🧹 Clearing invalid session data...',
              'index.tsx',
              'autoLogin',
            )

            // Send Discord notification for invalid session
            const errorNotification = createErrorNotification(
              'AUTO_LOGIN',
              `Invalid user type detected in stored session: ${authSession.userType}`,
              {
                userInfo: {
                  userId: authSession.userId,
                  userType: authSession.userType,
                  email: user?.email || undefined,
                },
                additionalContext: {
                  validUserTypes,
                  sessionData: {
                    isVerified,
                    sessionExpiry: new Date(
                      authSession.sessionExpiry,
                    ).toISOString(),
                    hasFirebaseUser: !!user,
                  },
                },
              },
            )
            sendDiscordErrorNotification(errorNotification)

            if (clearInvalidSession) {
              await clearInvalidSession()
            }
            setError(new Error('Invalid session data detected'))
            return
          }

          // Ensure the userType is properly typed instead of casting as any
          const userType = authSession.userType as UserType
          logToDiscord.log(
            `🔍 Processed user type: ${userType}`,
            'index.tsx',
            'autoLogin',
          )
          logToDiscord.log(
            `🔍 Available UserType enum values: ${validUserTypes.join(', ')}`,
            'index.tsx',
            'autoLogin',
          )

          // Use stored user type from auth session for faster routing
          const route = getUserRoutes({ type: userType })
          logToDiscord.log(
            `🚀 AUTO LOGIN: Attempting redirect to ${route}`,
            'index.tsx',
            'autoLogin',
          )

          try {
            router.replace(route)
            logToDiscord.log(
              '✅ Auto login redirect initiated successfully',
              'index.tsx',
              'autoLogin',
            )
            return
          } catch (error) {
            logToDiscord.error(
              `❌ Auto login redirect failed: ${error}`,
              'index.tsx',
              'autoLogin',
            )

            // Send Discord notification for redirect failure
            const errorNotification = createErrorNotification(
              'AUTO_LOGIN',
              `Auto login redirect failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              {
                userInfo: {
                  userId: authSession.userId,
                  userType: authSession.userType,
                  email: user?.email || undefined,
                },
                additionalContext: {
                  intendedRoute: route,
                  sessionData: {
                    isVerified,
                    sessionExpiry: new Date(
                      authSession.sessionExpiry,
                    ).toISOString(),
                  },
                  error: error instanceof Error ? error.stack : String(error),
                },
              },
            )
            sendDiscordErrorNotification(errorNotification)

            setError(new Error('Auto login redirect failed'))
            return
          }
        }

        logToDiscord.log(
          '❌ Auto login failed - showing splash screen',
          'index.tsx',
          'initializeApp',
        )
        logToDiscord.log('Reasons:', 'index.tsx', 'initializeApp')
        logToDiscord.log(
          `- Is verified: ${isVerified}`,
          'index.tsx',
          'initializeApp',
        )
        logToDiscord.log(
          `- Has session: ${!!authSession}`,
          'index.tsx',
          'initializeApp',
        )
        logToDiscord.log(
          `- Session user type: ${authSession?.userType}`,
          'index.tsx',
          'initializeApp',
        )
        logToDiscord.log(
          `- Firebase user (info only): ${!!user}`,
          'index.tsx',
          'initializeApp',
        )

        // User is not authenticated or not verified, show splash screen
        setIsLoading(false)
      } catch (err) {
        logToDiscord.error(
          `App initialization error: ${err}`,
          'index.tsx',
          'initializeApp',
        )

        // Send Discord notification for app initialization error
        const errorNotification = createErrorNotification(
          'AUTO_LOGIN',
          `App initialization failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
          {
            userInfo: {
              userId: authSession?.userId,
              userType: authSession?.userType,
              email: user?.email || undefined,
            },
            additionalContext: {
              authState: {
                loading,
                isInitialized,
                isVerified,
                hasAuthSession: !!authSession,
                hasUser: !!user,
              },
              error: err instanceof Error ? err.stack : String(err),
            },
          },
        )
        sendDiscordErrorNotification(errorNotification)

        setError(
          err instanceof Error ? err : new Error('Failed to initialize app'),
        )
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [loading, isVerified, authSession, isInitialized, router])

  const navigateToLogin = () => {
    try {
      router.push('/(auth)/login')
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Navigation failed'))
    }
  }

  // Show loading while auth is initializing, checking verification status, or user data is loading
  if (loading || !isInitialized || isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-800 items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Typo className="text-white mt-4">
          {loading ? 'Checking login status...' : 'Loading...'}
        </Typo>
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
