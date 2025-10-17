import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    const userData = localStorage.getItem("pb_user");

    if (!token || !userData) {
      setLoading(false);
      return;
    }

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  const loginAction = (token, userObj) => {
    const isAdmin = userObj.role === "admin";
    localStorage.setItem("pb_token", token);
    localStorage.setItem("pb_user", JSON.stringify(userObj));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userObj);
    toast.success("Login successful ✅");
    window.location.href = isAdmin ? "/admin/dashboard" : "/dashboard";
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logged out 👋");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
