import { Timestamp } from 'firebase/firestore'

export const getTimeFormatted = (createdAt: Timestamp | null | undefined) => {
  if (!createdAt) return 'Unknown'
  try {
    const date = createdAt.toDate()
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  } catch (error) {
    console.error('Error formatting time:', error)
    return 'Unknown'
  }
}
