import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '@/lib/firestore'
import { Student, UserIdRequest } from '@/utils/types'
import { documentId } from 'firebase/firestore' // 🔑 import this!

export const fetchStudentById = async ({ id }: UserIdRequest) => {
  const q = query(collection(db, 'students'), where(documentId(), '==', id))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0]
    return {
      id: docSnap.id,
      studentId: docSnap.data().studentId,
      parentId: docSnap.data().parentId,
      name: docSnap.data().name,
      address: docSnap.data().address,
      contactNumber: docSnap.data().contactNumber,
      gradeSection: docSnap.data().gradeSection,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    } as Student
  }

  return null
}
