import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore session
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await API.get("/wallet"); // or /auth/me if available

        const storedUser = JSON.parse(localStorage.getItem("pb_user")) || {};
        const role = localStorage.getItem("pb_role") || storedUser.role || "user";
        const isAdmin = role === "admin";

        setUser({
          ...storedUser,
          name: res.data.name || storedUser.name,
          email: res.data.email || storedUser.email,
          role,
          isAdmin,
        });
      } catch (err) {
        console.error("Auth check failed:", err);
        toast.error("Session expired — please log in again.");
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle login
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

      // 🔥 Force full reload to ensure correct route mount
      window.location.href = isAdmin ? "/admin/dashboard" : "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong during login");
    }
  };

  // ✅ Handle logout
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
