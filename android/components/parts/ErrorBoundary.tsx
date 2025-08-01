import React, { Component, ErrorInfo, ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/typo'
import Button from '@/components/button'
import {
  sendDiscordErrorNotification,
  createErrorNotification,
} from '@/utils/discordNotification'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  errorContext?: 'DASHBOARD' | 'LOGIN' | 'AUTO_LOGIN'
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Send Discord notification for unhandled React error
    const errorNotification = createErrorNotification(
      this.props.errorContext || 'DASHBOARD',
      `Unhandled React error: ${error.message}`,
      {
        additionalContext: {
          errorName: error.name,
          errorMessage: error.message,
          errorStack: error.stack,
          componentStack: errorInfo.componentStack,
          errorBoundaryContext: this.props.errorContext || 'DASHBOARD',
          timestamp: new Date().toISOString(),
        },
      },
    )
    sendDiscordErrorNotification(errorNotification)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <SafeAreaView className="flex-1 bg-slate-800 items-center justify-center px-10">
          <View className="items-center">
            <Text className="text-6xl mb-4">⚠️</Text>
            <Typo className="text-white text-xl font-bold text-center mb-2">
              Something went wrong
            </Typo>
            <Typo className="text-gray-400 text-center mb-6">
              An unexpected error occurred. The error has been reported to our
              team.
            </Typo>
            {this.state.error && (
              <View className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 mb-6">
                <Typo className="text-red-400 text-sm font-mono">
                  {this.state.error.message}
                </Typo>
              </View>
            )}
            <Button
              className="bg-cyan-500 items-center rounded-3xl p-5 w-full"
              onPress={this.handleRetry}
            >
              <Typo className="text-white font-semibold">Try Again</Typo>
            </Button>
          </View>
        </SafeAreaView>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
