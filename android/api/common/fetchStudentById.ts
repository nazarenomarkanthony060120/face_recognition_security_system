import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Student, UserIdRequest } from '@/utils/types'

export const fetchAllStudents = async ({ id }: UserIdRequest) => {

  const q = query(collection(db, 'students'), where('id', '==', id))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      name: docSnap.data().name,
      gradeSection: docSnap.data().gradeSection,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Student[]
  }

  return []
}
