// src/authContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    // ✅ Fetch profile to verify token and get user data
    API.get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("pb_token");
        localStorage.removeItem("pb_user");
        localStorage.removeItem("pb_role");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (data) => {
    localStorage.setItem("pb_token", data.token);
    localStorage.setItem("pb_role", data.user.role);
    localStorage.setItem("pb_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
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
