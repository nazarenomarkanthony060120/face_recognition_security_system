import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ParentType, UserType } from '@/utils/types'

export const fetchAllParents = async () => {
  const q = query(collection(db, 'users'), where('type', '==', UserType.USER))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      name: docSnap.data().name,
      email: docSnap.data().email,
      status: docSnap.data().status,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as ParentType[]
  }

  return []
}
