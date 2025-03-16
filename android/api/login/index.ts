import { auth } from "@/lib/firestore";
import { LoginRequest } from "@/utils/types";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (data: LoginRequest) => {
  const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
  return userCredential.user
}