import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user and token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    const storedUser = localStorage.getItem("pb_user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("pb_user");
      }
    }
    setLoading(false);
  }, []);

  // ✅ Login helper
  const login = (token, userData) => {
    localStorage.setItem("pb_token", token);
    localStorage.setItem("pb_user", JSON.stringify(userData));
    localStorage.setItem("pb_role", userData.role);
    setUser(userData);
    toast.success("Login successful ✅");
  };

  // ✅ Logout helper
  const logout = () => {
    localStorage.removeItem("pb_token");
    localStorage.removeItem("pb_user");
    localStorage.removeItem("pb_role");
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
