import { auth } from '@/lib/firestore'

export const logoutUser = async () => {
  await auth.signOut()
}
