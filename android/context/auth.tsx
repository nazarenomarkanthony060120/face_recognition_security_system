import React, { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firestore'

type ContextProps = {
  user: User | null
}

const AuthContext = createContext<Partial<ContextProps>>({})

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
