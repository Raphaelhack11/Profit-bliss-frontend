// src/authContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // verify token or load user info on app start
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/wallet")
      .then((res) => {
        const data = res.data;
        setUser({
          name: data.name || JSON.parse(localStorage.getItem("pb_user"))?.name,
          email: data.email || JSON.parse(localStorage.getItem("pb_user"))?.email,
          role: localStorage.getItem("pb_role") || "user",
          isAdmin: localStorage.getItem("pb_role") === "admin"
        });
      })
      .catch(() => {
        // token invalid -> clear all
        localStorage.clear();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const loginAction = (token, userObj) => {
    if (!token || !userObj) return;
    localStorage.setItem("pb_token", token);
    localStorage.setItem("pb_user", JSON.stringify(userObj));
    localStorage.setItem("pb_role", userObj.role || "user");
    setUser({ ...userObj, isAdmin: userObj.role === "admin" });
    toast.success("Login successful");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAction, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
