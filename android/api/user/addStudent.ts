import { db, serverTimestamp } from '@/lib/firestore'
import { AddStudent } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'

export const addStudent = async (data: AddStudent) => {
  return await addDoc(collection(db, 'students'), {
    userId: data.userId,
    studentId: data.studentId,
    name: data.name,
    gradeSection: data.gradeSection,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
