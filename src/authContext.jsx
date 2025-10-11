import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // just test: do nothing for now
  }, []);

  const login = (token) => {
    localStorage.setItem("pb_token", token);
    toast.success("Login successful");
    setUser({ loggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem("pb_token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
