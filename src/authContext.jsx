import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    const storedUser = localStorage.getItem("pb_user");
    if (!token || !storedUser) {
      setLoading(false);
      return;
    }

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("pb_token");
      localStorage.removeItem("pb_user");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Login action
  const loginAction = async (token, userData) => {
    localStorage.setItem("pb_token", token);
    localStorage.setItem("pb_user", JSON.stringify(userData));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
    toast.success("Login successful ✅");
  };

  // ✅ Logout action
  const logout = () => {
    localStorage.removeItem("pb_token");
    localStorage.removeItem("pb_user");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
    toast.success("Logged out 👋");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
