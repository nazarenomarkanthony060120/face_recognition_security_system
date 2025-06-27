import { db } from '@/lib/firestore'
import { History, UserIdRequest } from '@/utils/types'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

export const fetchHistory = async ({ id }: UserIdRequest) => {
  console.log('fetchHistory called with id:', id)
  try {
    const q = query(
      collection(db, 'history'),
      where('student_uid', '==', id),
      orderBy('timestamp', 'desc')
    )
    console.log('testing ni - about to query with orderBy')
    const snapshot = await getDocs(q)
    console.log('Query with orderBy successful, snapshot.empty:', snapshot.empty)
    console.log('Number of docs found:', snapshot.docs.length)

    if (!snapshot.empty) {
      const results = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        status: docSnap.data().status,
        studentId: docSnap.data().studentId,
        timestamp: docSnap.data().timestamp,
      })) as History[]
      console.log('Returning results with orderBy:', results)
      return results
    }

    console.log('No documents found with orderBy query')
    return []
  } catch (error) {
    // If composite index doesn't exist, fall back to query without orderBy
    console.log('Composite index required, falling back to client-side sorting:', error)

    const q = query(
      collection(db, 'history'),
      where('student_uid', '==', id)
    )

    console.log('Trying fallback query without orderBy')
    const snapshot = await getDocs(q)
    console.log('Fallback query result, snapshot.empty:', snapshot.empty)
    console.log('Fallback - Number of docs found:', snapshot.docs.length)

    if (!snapshot.empty) {
      const historyData = snapshot.docs.map((docSnap) => {
        const data = docSnap.data()
        console.log('Document data:', data)
        return {
          id: docSnap.id,
          status: data.status,
          studentId: data.studentId,
          timestamp: data.timestamp,
        }
      }) as History[]

      console.log('Raw history data before sorting:', historyData)

      // Sort by timestamp on client side
      const sortedData = historyData.sort((a, b) => {
        const timestampA = (a.timestamp as any)?.toDate?.() || new Date(a.timestamp as any)
        const timestampB = (b.timestamp as any)?.toDate?.() || new Date(b.timestamp as any)
        return timestampB.getTime() - timestampA.getTime()
      })

      console.log('Returning sorted fallback results:', sortedData)
      return sortedData
    }

    console.log('No documents found in fallback query either')
    return []
  }
}
