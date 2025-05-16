import { db, doc, setDoc, getDoc, serverTimestamp } from '@/lib/firestore'
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { sendSMS } from './twilio'

interface SendOTPRequest {
  phoneNumber: string
}

interface VerifyOTPRequest {
  phoneNumber: string
  otp: string
}

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Store OTP in Firestore with expiration
const storeOTP = async (phoneNumber: string, otp: string) => {
  const otpRef = doc(collection(db, 'otps'))
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 5) // OTP expires in 5 minutes

  await setDoc(otpRef, {
    phoneNumber,
    otp,
    expiresAt,
    createdAt: serverTimestamp(),
  })

  return otpRef.id
}

// Send OTP to phone number
export const sendOTP = async ({ phoneNumber }: SendOTPRequest) => {
  try {
    // Generate OTP
    const otp = generateOTP()

    // Store OTP in Firestore
    await storeOTP(phoneNumber, otp)

    // Send OTP via Twilio SMS
    const message = `Your OTP for Face Recognition Security System is: ${otp}. This code will expire in 5 minutes.`
    await sendSMS(phoneNumber, message)

    return { success: true }
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw new Error('Failed to send OTP')
  }
}

// Verify OTP
export const verifyOTP = async ({ phoneNumber, otp }: VerifyOTPRequest) => {
  try {
    // Query for the most recent OTP for this phone number
    const q = query(
      collection(db, 'otps'),
      where('phoneNumber', '==', phoneNumber)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error('No OTP found for this phone number')
    }

    // Get the most recent OTP document
    const otpDoc = querySnapshot.docs[0]
    const otpData = otpDoc.data()

    // Check if OTP has expired
    const expiresAt = otpData.expiresAt.toDate()
    if (expiresAt < new Date()) {
      await deleteDoc(otpDoc.ref)
      throw new Error('OTP has expired')
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      throw new Error('Invalid OTP')
    }

    // Delete the used OTP
    await deleteDoc(otpDoc.ref)

    return { success: true }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    throw error
  }
} 