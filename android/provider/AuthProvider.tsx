import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { User } from "firebase/auth";
import { auth } from "@/lib/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

      if (!user) {
        router.replace("/screens/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
