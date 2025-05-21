import { db, doc, setDoc, serverTimestamp } from '@/lib/firestore'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  orderBy,
  limit,
} from 'firebase/firestore'
import { sendOTPNotification } from '../notifications'

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

    // Send OTP via notification
    await sendOTPNotification(otp)

    return { success: true }
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw new Error('Failed to send OTP')
  }
}

// Verify OTP
export const verifyOTP = async ({ phoneNumber, otp }: VerifyOTPRequest) => {
  try {
    console.log('Starting OTP verification:', {
      phoneNumber,
      receivedOTP: otp,
      receivedOTPLength: otp.length,
      receivedOTPType: typeof otp,
      timestamp: new Date().toISOString(),
    })

    // Query for the most recent OTP for this phone number
    const q = query(
      collection(db, 'otps'),
      where('phoneNumber', '==', phoneNumber),
      orderBy('createdAt', 'desc'),
      limit(1),
    )

    const querySnapshot = await getDocs(q)
    console.log('Firestore query results:', {
      foundDocuments: querySnapshot.size,
      phoneNumber,
      timestamp: new Date().toISOString(),
    })

    if (querySnapshot.empty) {
      console.log('No OTP found for phone number:', phoneNumber)
      throw new Error('No OTP found for this phone number')
    }

    // Get the most recent OTP document
    const otpDoc = querySnapshot.docs[0]
    const otpData = otpDoc.data()

    // Log the complete OTP data for debugging
    console.log('OTP verification details:', {
      documentId: otpDoc.id,
      phoneNumber: otpData.phoneNumber,
      storedOTP: otpData.otp,
      storedOTPLength: otpData.otp?.length,
      storedOTPType: typeof otpData.otp,
      receivedOTP: otp,
      receivedOTPLength: otp.length,
      receivedOTPType: typeof otp,
      expiresAt: otpData.expiresAt?.toDate(),
      createdAt: otpData.createdAt?.toDate(),
      currentTime: new Date(),
      timestamp: new Date().toISOString(),
    })

    // Check if OTP has expired
    const expiresAt = otpData.expiresAt?.toDate()
    if (!expiresAt) {
      console.log('No expiration time found for OTP')
      throw new Error('Invalid OTP configuration')
    }

    if (expiresAt < new Date()) {
      console.log('OTP expired:', {
        expiresAt: expiresAt.toISOString(),
        currentTime: new Date().toISOString(),
      })
      await deleteDoc(otpDoc.ref)
      throw new Error('OTP has expired')
    }

    // Normalize OTPs for comparison
    const storedOTP = otpData.otp?.toString().trim()
    const receivedOTP = otp.toString().trim()

    console.log('OTP comparison details:', {
      storedOTP,
      receivedOTP,
      storedOTPLength: storedOTP?.length,
      receivedOTPLength: receivedOTP.length,
      exactMatch: storedOTP === receivedOTP,
      caseInsensitiveMatch:
        storedOTP?.toLowerCase() === receivedOTP.toLowerCase(),
      storedOTPChars: storedOTP?.split('').map((c: string) => c.charCodeAt(0)),
      receivedOTPChars: receivedOTP
        .split('')
        .map((c: string) => c.charCodeAt(0)),
      timestamp: new Date().toISOString(),
    })

    // Try both exact and case-insensitive comparison
    if (
      storedOTP !== receivedOTP &&
      storedOTP?.toLowerCase() !== receivedOTP.toLowerCase()
    ) {
      console.log('OTP verification failed:', {
        stored: storedOTP,
        received: receivedOTP,
        storedLength: storedOTP?.length,
        receivedLength: receivedOTP.length,
        storedOTPChars: storedOTP
          ?.split('')
          .map((c: string) => c.charCodeAt(0)),
        receivedOTPChars: receivedOTP
          .split('')
          .map((c: string) => c.charCodeAt(0)),
        timestamp: new Date().toISOString(),
      })
      throw new Error('Invalid OTP')
    }

    // Delete the used OTP
    await deleteDoc(otpDoc.ref)
    console.log('OTP verified successfully')

    return { success: true }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    throw error
  }
}
