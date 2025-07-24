import { db, serverTimestamp } from '@/lib/firestore'
import { AddStudent } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'

export const addStudentRegister = async (data: AddStudent) => {
  return await addDoc(collection(db, 'students'), {
    parentId: data.id,
    studentId: data.studentId,
    name: data.name,
    contactNumber: data.contactNumber,
    address: data.address,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
