import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@/lib/firestore'
import { LoginRequest } from '@/utils/types'

export const signIn = async (data: LoginRequest) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  return userCredential.user
}

export const signUp = async (data: LoginRequest) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  return userCredential.user
}
