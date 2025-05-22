import { db, doc, getDoc, updateDoc, serverTimestamp } from '@/lib/firestore'
import { UserIdRequest, UserStatusDB } from '@/utils/types'

export const updateStatus = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')

  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('User not found')
  }

  const status = docSnap.data().status === UserStatusDB.ACTIVE ? UserStatusDB.INACTIVE : UserStatusDB.ACTIVE

  await updateDoc(docRef, {
    status: status,
    updatedAt: serverTimestamp(),
  })

  return true
}
