import { auth, signInWithEmailAndPassword } from '@/lib/firestore'
import { LoginRequest } from '@/utils/types'
import { fetchUserById } from '../common/fetchUserById'

export const loginUser = async (data: LoginRequest) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  // const type = await fetchUserById({ id: userCredential.user.uid })
  return userCredential.user.uid
}
