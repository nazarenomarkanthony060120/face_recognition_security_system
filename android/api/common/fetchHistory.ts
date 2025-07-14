import { db } from '@/lib/firestore'
import { History, UserIdRequest } from '@/utils/types'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

export const fetchHistory = async ({ id }: UserIdRequest) => {
  try {
    const q = query(
      collection(db, 'history'),
      where('student_uid', '==', id),
      orderBy('timestamp', 'desc'),
    )
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const results = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        status: docSnap.data().status,
        studentId: docSnap.data().studentId,
        timestamp: docSnap.data().timestamp,
      })) as History[]
      return results
    }

    return []
  } catch (error) {
    // If composite index doesn't exist, fall back to query without orderBy
    const q = query(collection(db, 'history'), where('student_uid', '==', id))

    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const historyData = snapshot.docs.map((docSnap) => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          status: data.status,
          studentId: data.studentId,
          timestamp: data.timestamp,
        }
      }) as History[]

      // Sort by timestamp on client side
      const sortedData = historyData.sort((a, b) => {
        const timestampA =
          (a.timestamp as any)?.toDate?.() || new Date(a.timestamp as any)
        const timestampB =
          (b.timestamp as any)?.toDate?.() || new Date(b.timestamp as any)
        return timestampB.getTime() - timestampA.getTime()
      })

      return sortedData
    }

    return []
  }
}
