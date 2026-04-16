import { createContext, useState } from "react";

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