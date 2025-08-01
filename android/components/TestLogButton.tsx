import React from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import Typo from '@/components/typo'
import { logToDiscord } from '@/utils/discordLogger'

const TestLogButton = () => {
  const sendTestLogs = async () => {
    // Add some test logs
    logToDiscord.log(
      '🧪 Test log message from TestLogButton',
      'TestLogButton.tsx',
      'sendTestLogs',
    )
    logToDiscord.info(
      'ℹ️ Test info message',
      'TestLogButton.tsx',
      'sendTestLogs',
    )
    logToDiscord.warn(
      '⚠️ Test warning message',
      'TestLogButton.tsx',
      'sendTestLogs',
    )
    logToDiscord.error(
      '❌ Test error message',
      'TestLogButton.tsx',
      'sendTestLogs',
    )

    // Force send to Discord
    const success = await logToDiscord.send()

    Alert.alert(
      'Test Logs',
      success
        ? `✅ Test logs sent to Discord successfully!`
        : '❌ Failed to send logs to Discord',
    )
  }

  const showLogCount = () => {
    const count = logToDiscord.getLogCount()
    Alert.alert('Log Count', `Currently ${count} logs in buffer`)
  }

  return (
    <>
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-xl mb-2"
        onPress={sendTestLogs}
      >
        <Typo className="text-white text-center font-semibold">
          📤 Send Test Logs to Discord
        </Typo>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-500 p-3 rounded-xl"
        onPress={showLogCount}
      >
        <Typo className="text-white text-center font-semibold">
          📊 Show Log Count
        </Typo>
      </TouchableOpacity>
    </>
  )
}

export default TestLogButton
