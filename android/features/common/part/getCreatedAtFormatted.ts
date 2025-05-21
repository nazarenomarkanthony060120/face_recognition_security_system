import { Timestamp } from 'firebase/firestore'

export const createdAtFormatted = (createdAt: Timestamp | null | undefined) => {
  return createdAt?.toDate
    ? createdAt.toDate().toLocaleString().split(',')[0]
    : 'Unknown'
}
