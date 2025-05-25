import { db } from '@/lib/firestore'
import { History, UserIdRequest } from '@/utils/types'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const fetchHistory = async ({id}: UserIdRequest) => {
  const q = query(
    collection(db, 'history'),
    where('student_uid', '==', id),
  )

  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      status: docSnap.data().status,
      studentId: docSnap.data().studentId,
      timestamp: docSnap.data().timestamp,
    })) as History[]
  }

  return []
}
