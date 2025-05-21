import { db, serverTimestamp } from '@/lib/firestore'
import { AddStudent } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'

export const addStudentRegister = async (data: AddStudent) => {
  console.log(data, ' ohyeah')
  return await addDoc(collection(db, 'students'), {
    parentId: data.id,
    studentId: data.studentId,
    name: data.name,
    gradeSection: data.gradeSection,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
