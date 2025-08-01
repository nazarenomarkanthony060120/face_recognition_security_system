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

    // Add additional context if available
    if (data.additionalContext) {
      const contextString = JSON.stringify(data.additionalContext, null, 2)
      if (contextString.length < 1024) { // Discord field value limit
        embed.fields.push({
          name: "🔍 Additional Context",
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
      timestamp: data.timestamp
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