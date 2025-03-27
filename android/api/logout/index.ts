import { auth } from "@/lib/firestore"
import { signOut } from "firebase/auth"

export const logoutUser = async () => {
  await signOut(auth)
}