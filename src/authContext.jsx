import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    toast.success("Logged in");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
