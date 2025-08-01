const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1400715402736046090/KfM8HBnl4FaxOQb4ZRyf4S6PC5-Vp08Qictz_nQTIKSrZ9FWoTapQVars_gLwVYed5UV'

interface LogEntry {
  timestamp: string
  level: 'log' | 'info' | 'warn' | 'error'
  message: string
  source: string
  context?: string
}

class DiscordLogger {
  private logs: LogEntry[] = []
  private maxLogs = 50 // Maximum logs to keep in buffer
  private sendTimer: NodeJS.Timeout | null = null
  private sendDelay = 10000 // Send logs every 10 seconds
  private isEnabled = true

  constructor() {
    // Auto-send logs periodically
    this.startAutoSend()
  }

  private startAutoSend() {
    if (this.sendTimer) {
      clearInterval(this.sendTimer)
    }

    this.sendTimer = setInterval(() => {
      if (this.logs.length > 0) {
        this.sendLogsToDiscord()
      }
    }, this.sendDelay)
  }

  public log(message: string, source: string, context?: string) {
    if (!this.isEnabled) return

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'log',
      message,
      source,
      context
    }

    this.addLog(logEntry)
  }

  public info(message: string, source: string, context?: string) {
    if (!this.isEnabled) return

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      source,
      context
    }

    this.addLog(logEntry)
  }

  public warn(message: string, source: string, context?: string) {
    if (!this.isEnabled) return

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      source,
      context
    }

    this.addLog(logEntry)
  }

  public error(message: string, source: string, context?: string) {
    if (!this.isEnabled) return

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      source,
      context
    }

    this.addLog(logEntry)
  }

  private addLog(logEntry: LogEntry) {
    this.logs.push(logEntry)

    // Keep only the latest logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Also log to console for local debugging
    const prefix = `[${logEntry.source}${logEntry.context ? `:${logEntry.context}` : ''}]`
    console.log(`${prefix} ${logEntry.message}`)
  }

  public async sendLogsToDiscord() {
    if (this.logs.length === 0) return

    try {
      const logsBySource = this.groupLogsBySource()

      const embed = {
        title: '📋 Console Logs Report',
        description: `Collected ${this.logs.length} log entries from authentication flow`,
        color: 3447003, // Blue color
        fields: [] as Array<{ name: string; value: string; inline: boolean }>,
        footer: {
          text: `Face Recognition Security System • ${new Date().toLocaleString()}`
        },
        timestamp: new Date().toISOString()
      }

      // Add logs by source
      for (const [source, logs] of Object.entries(logsBySource)) {
        const logText = logs.map(log => {
          const emoji = this.getEmojiForLevel(log.level)
          const time = new Date(log.timestamp).toLocaleTimeString()
          const context = log.context ? ` [${log.context}]` : ''
          return `${emoji} \`${time}\`${context} ${log.message}`
        }).join('\n')

        // Discord field value limit is 1024 characters
        const truncatedText = logText.length > 1000
          ? logText.substring(0, 1000) + '\n...[truncated]'
          : logText

        embed.fields.push({
          name: `📁 ${source}`,
          value: truncatedText || 'No logs',
          inline: false
        })
      }

      const payload = {
        embeds: [embed]
      }

      console.log(`📤 Sending ${this.logs.length} logs to Discord...`)

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

      console.log('✅ Discord logs sent successfully')

      // Clear logs after sending
      this.logs = []

      return true
    } catch (error) {
      console.error('❌ Failed to send logs to Discord:', error)
      return false
    }
  }

  private groupLogsBySource(): Record<string, LogEntry[]> {
    const grouped: Record<string, LogEntry[]> = {}

    for (const log of this.logs) {
      if (!grouped[log.source]) {
        grouped[log.source] = []
      }
      grouped[log.source].push(log)
    }

    return grouped
  }

  private getEmojiForLevel(level: string): string {
    switch (level) {
      case 'error': return '❌'
      case 'warn': return '⚠️'
      case 'info': return 'ℹ️'
      case 'log': return '📝'
      default: return '📝'
    }
  }

  public enable() {
    this.isEnabled = true
    this.startAutoSend()
  }

  public disable() {
    this.isEnabled = false
    if (this.sendTimer) {
      clearInterval(this.sendTimer)
      this.sendTimer = null
    }
  }

  public forceSend() {
    return this.sendLogsToDiscord()
  }

  public clear() {
    this.logs = []
  }

  public getLogCount() {
    return this.logs.length
  }
}

// Create singleton instance
export const discordLogger = new DiscordLogger()

// Helper functions for easier usage
export const logToDiscord = {
  log: (message: string, source: string, context?: string) =>
    discordLogger.log(message, source, context),

  info: (message: string, source: string, context?: string) =>
    discordLogger.info(message, source, context),

  warn: (message: string, source: string, context?: string) =>
    discordLogger.warn(message, source, context),

  error: (message: string, source: string, context?: string) =>
    discordLogger.error(message, source, context),

  send: () => discordLogger.forceSend(),

  clear: () => discordLogger.clear(),

  enable: () => discordLogger.enable(),

  disable: () => discordLogger.disable(),

  getLogCount: () => discordLogger.getLogCount()
} 