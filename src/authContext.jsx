import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState(""); // 👈 show what's happening

  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        // 👇 Try a reliable endpoint (adjust if needed)
        const res = await API.get("/auth/me");
        setUser(res.data.user);
        setDebug(JSON.stringify(res.data, null, 2));
      } catch (err) {
        console.log("Auth check failed:", err.response?.data || err.message);
        setDebug("❌ Auth check failed: " + JSON.stringify(err.response?.data || err.message));
        localStorage.removeItem("pb_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("pb_token", token);
    localStorage.setItem("pb_user", JSON.stringify(userData));
    setUser(userData);
    toast.success("Logged in");
  };

  const logout = () => {
    localStorage.removeItem("pb_token");
    localStorage.removeItem("pb_user");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, debug }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
