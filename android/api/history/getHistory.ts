import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const getHistory = async (studentId: string) => {
  const q = query(collection(db, 'history'), where('student_uid', '==', studentId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
