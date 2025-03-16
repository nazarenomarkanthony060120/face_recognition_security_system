import { auth } from "@/lib/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}