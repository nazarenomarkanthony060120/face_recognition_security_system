import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from '@/lib/firestore'
import { RegisterParentType, UserStatusDB, UserType } from '@/utils/types'

export const registerParent = async (data: RegisterParentType) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  const user = userCredential.user

  await setDoc(doc(db, 'users', user.uid), {
    name: data.parentName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    password: data.password,
    status: UserStatusDB.ACTIVE,
    type: UserType.USER,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return user
}
