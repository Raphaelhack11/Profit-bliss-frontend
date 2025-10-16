import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user session on mount
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // You can replace `/wallet` with `/auth/me` if your backend supports it
        const res = await API.get("/wallet");

        const storedUser = JSON.parse(localStorage.getItem("pb_user")) || {};
        const role = localStorage.getItem("pb_role") || storedUser.role || "user";
        const isAdmin = role === "admin";

        const userData = {
          ...storedUser,
          name: res.data.name || storedUser.name,
          email: res.data.email || storedUser.email,
          role,
          isAdmin,
        };

        setUser(userData);
      } catch (err) {
        console.error("Auth check failed:", err);
        toast.error("Session expired — please log in again.");
        localStorage.removeItem("pb_token");
        localStorage.removeItem("pb_role");
        localStorage.removeItem("pb_user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handles login success
  const loginAction = (token, userObj) => {
    try {
      const role = userObj?.role || "user";
      const isAdmin = role === "admin";

      localStorage.setItem("pb_token", token);
      localStorage.setItem("pb_role", role);
      localStorage.setItem("pb_user", JSON.stringify(userObj));

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ ...userObj, isAdmin });

      toast.success("Login successful ✅");

      // 🔥 Redirect automatically based on role
      window.location.href = isAdmin ? "/admin/dashboard" : "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong during login");
    }
  };

  // ✅ Logout user completely
  const logout = () => {
    localStorage.removeItem("pb_token");
    localStorage.removeItem("pb_role");
    localStorage.removeItem("pb_user");
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
