import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false)

  const login = () => {
    setIsloggedIn(true)
  }

  const logout = () => {
    setIsloggedIn(false)
  }

  const value = {
    isLoggedIn,
    login,
    logout
  }

  return <AuthContext value={value}>
    {children}
  </AuthContext>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}