"use client";

import { createContext, useContext } from "react";
import {
  useAuthInternal,
  AuthUserProfile,
} from "@/hooks/feature/auth/useAuthInternal";

type AuthContextType = {
  user: AuthUserProfile;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthInternal();

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
