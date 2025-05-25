import { db } from '@/lib/firestore'
import { collection, getDocs } from 'firebase/firestore'

export const getAllHistory = async () => {
  const snapshot = await getDocs(collection(db, 'history'))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
