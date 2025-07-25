import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Student, UserIdRequest } from '@/utils/types'

export const fetchAllStudents = async ({ id }: UserIdRequest) => {
  const q = query(collection(db, 'students'), where('parentId', '==', id))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      studentId: docSnap.data().studentId,
      parentId: docSnap.data().parentId,
      name: docSnap.data().name,
      address: docSnap.data().address,
      contactNumber: docSnap.data().contactNumber,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Student[]
  }

  return []
}
