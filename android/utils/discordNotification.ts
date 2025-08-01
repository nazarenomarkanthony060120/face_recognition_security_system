const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1400715402736046090/KfM8HBnl4FaxOQb4ZRyf4S6PC5-Vp08Qictz_nQTIKSrZ9FWoTapQVars_gLwVYed5UV'

export interface ErrorNotificationData {
  errorType: 'LOGIN' | 'AUTO_LOGIN' | 'DASHBOARD'
  errorMessage: string
  userInfo?: {
    email?: string
    userId?: string
    userType?: string
  }
  deviceInfo?: {
    platform?: string
    deviceId?: string
  }
  timestamp: string
  additionalContext?: Record<string, any>
}

export const sendDiscordErrorNotification = async (data: ErrorNotificationData) => {
  try {
    const embed = {
      title: `🚨 ${data.errorType} Error Detected`,
      description: data.errorMessage,
      color: 15158332, // Red color
      fields: [
        {
          name: "🕐 Timestamp",
          value: data.timestamp,
          inline: true
        },
        {
          name: "📱 Error Type",
          value: data.errorType,
          inline: true
        }
      ],
      footer: {
        text: "Face Recognition Security System"
      }
    }

    // Add user info if available
    if (data.userInfo) {
      if (data.userInfo.email) {
        embed.fields.push({
          name: "👤 User Email",
          value: data.userInfo.email,
          inline: true
        })
      }
      if (data.userInfo.userId) {
        embed.fields.push({
          name: "🆔 User ID",
          value: data.userInfo.userId,
          inline: true
        })
      }
      if (data.userInfo.userType) {
        embed.fields.push({
          name: "🎭 User Type",
          value: data.userInfo.userType,
          inline: true
        })
      }
    }

    // Add device info if available
    if (data.deviceInfo) {
      if (data.deviceInfo.platform) {
        embed.fields.push({
          name: "📱 Platform",
          value: data.deviceInfo.platform,
          inline: true
        })
      }
    }

    // Add stack trace prominently if available
    if (data.additionalContext?.errorStack || data.additionalContext?.error?.stack) {
      const stackTrace = data.additionalContext.errorStack || data.additionalContext.error?.stack
      if (stackTrace && typeof stackTrace === 'string') {
        // Truncate stack trace if too long (Discord field limit is 1024 chars)
        const truncatedStack = stackTrace.length > 900
          ? stackTrace.substring(0, 900) + '...\n[Stack trace truncated]'
          : stackTrace

        embed.fields.push({
          name: "🔍 Stack Trace",
          value: `\`\`\`\n${truncatedStack}\n\`\`\``,
          inline: false
        })
      }
    }

    // Add component stack for React errors
    if (data.additionalContext?.componentStack) {
      const componentStack = data.additionalContext.componentStack
      if (componentStack && typeof componentStack === 'string') {
        const truncatedComponentStack = componentStack.length > 900
          ? componentStack.substring(0, 900) + '...\n[Component stack truncated]'
          : componentStack

        embed.fields.push({
          name: "⚛️ Component Stack",
          value: `\`\`\`\n${truncatedComponentStack}\n\`\`\``,
          inline: false
        })
      }
    }

    // Add other additional context (excluding stack traces to avoid duplication)
    if (data.additionalContext) {
      const contextCopy = { ...data.additionalContext }
      // Remove stack traces from general context since we show them separately
      delete contextCopy.errorStack
      delete contextCopy.componentStack
      delete contextCopy.error?.stack

      const contextString = JSON.stringify(contextCopy, null, 2)
      if (contextString !== '{}' && contextString.length < 800) {
        embed.fields.push({
          name: "📋 Additional Context",
          value: `\`\`\`json\n${contextString}\n\`\`\``,
          inline: false
        })
      }
    }

    const payload = {
      embeds: [embed]
    }

    console.log('📤 Sending error notification to Discord...', {
      errorType: data.errorType,
      errorMessage: data.errorMessage,
      timestamp: data.timestamp,
      hasStackTrace: !!(data.additionalContext?.errorStack || data.additionalContext?.error?.stack)
    })

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status} ${response.statusText}`)
    }

    console.log('✅ Discord error notification sent successfully')
    return true
  } catch (error) {
    console.error('❌ Failed to send Discord error notification:', error)
    // Don't throw error to prevent notification failures from breaking the app
    return false
  }
}

// Helper function to get device/platform info
export const getDeviceInfo = () => {
  try {
    const platform = require('expo-constants').default?.platform
    return {
      platform: platform?.ios ? 'iOS' : platform?.android ? 'Android' : 'Unknown',
      deviceId: require('expo-constants').default?.deviceId || 'Unknown'
    }
  } catch {
    return {
      platform: 'Unknown',
      deviceId: 'Unknown'
    }
  }
}

// Helper function to create error notification data
export const createErrorNotification = (
  errorType: ErrorNotificationData['errorType'],
  errorMessage: string,
  options?: {
    userInfo?: ErrorNotificationData['userInfo']
    additionalContext?: ErrorNotificationData['additionalContext']
  }
): ErrorNotificationData => {
  return {
    errorType,
    errorMessage,
    userInfo: options?.userInfo,
    deviceInfo: getDeviceInfo(),
    timestamp: new Date().toISOString(),
    additionalContext: options?.additionalContext
  }
}

// Helper function to create enhanced error notification for JavaScript errors
export const createEnhancedErrorNotification = (
  errorType: ErrorNotificationData['errorType'],
  error: Error,
  options?: {
    userInfo?: ErrorNotificationData['userInfo']
    context?: string
    componentStack?: string
  }
): ErrorNotificationData => {
  // Extract more details from the error
  const errorDetails = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    // Try to extract the specific line and file from stack trace
    sourceLine: extractSourceLineFromStack(error.stack),
    // Check if it's a common undefined property access error
    isPropertyAccessError: error.message.includes('Cannot read property') || error.message.includes('Cannot read properties'),
  }

  return {
    errorType,
    errorMessage: `${error.name}: ${error.message}`,
    userInfo: options?.userInfo,
    deviceInfo: getDeviceInfo(),
    timestamp: new Date().toISOString(),
    additionalContext: {
      error: errorDetails,
      errorStack: error.stack,
      componentStack: options?.componentStack,
      context: options?.context,
      errorAnalysis: {
        likelyUndefinedProperty: errorDetails.isPropertyAccessError ? extractUndefinedProperty(error.message) : null,
        errorCategory: categorizeError(error),
      }
    }
  }
}

// Helper to extract which property was undefined
const extractUndefinedProperty = (message: string): string | null => {
  const match = message.match(/Cannot read propert(?:y|ies) ['"]([^'"]+)['"]/)
  return match ? match[1] : null
}

// Helper to extract source file and line from stack trace
const extractSourceLineFromStack = (stack?: string): string | null => {
  if (!stack) return null

  const lines = stack.split('\n')
  for (const line of lines) {
    // Look for app source files (not node_modules)
    if (line.includes('.tsx') || line.includes('.ts')) {
      const match = line.match(/\(([^)]+)\)/)
      return match ? match[1] : line.trim()
    }
  }
  return null
}

// Helper to categorize error types
const categorizeError = (error: Error): string => {
  if (error.message.includes('Cannot read property') || error.message.includes('Cannot read properties')) {
    return 'UNDEFINED_PROPERTY_ACCESS'
  }
  if (error.message.includes('Cannot set property')) {
    return 'UNDEFINED_PROPERTY_SET'
  }
  if (error.message.includes('is not a function')) {
    return 'FUNCTION_NOT_FOUND'
  }
  if (error.message.includes('Network')) {
    return 'NETWORK_ERROR'
  }
  if (error.name === 'TypeError') {
    return 'TYPE_ERROR'
  }
  if (error.name === 'ReferenceError') {
    return 'REFERENCE_ERROR'
  }
  return 'UNKNOWN_ERROR'
} 