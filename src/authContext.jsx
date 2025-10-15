import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage + verify token
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await API.get("/wallet"); // or "/auth/me" if available

        const storedUser = JSON.parse(localStorage.getItem("pb_user")) || {};
        const storedRole = localStorage.getItem("pb_role") || "user";

        const userData = {
          ...storedUser,
          name: res.data.name || storedUser.name,
          email: res.data.email || storedUser.email,
          role: storedRole,
          isAdmin: storedRole === "admin",
        };

        setUser(userData);
      } catch (err) {
        console.error("Auth check failed:", err);
        toast.error("Session expired — please log in again.");
        logout(); // ✅ clears everything safely
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Login action (called from Login page)
  const loginAction = (token, userObj) => {
    try {
      localStorage.setItem("pb_token", token);
      localStorage.setItem("pb_role", userObj?.role || "user");
      localStorage.setItem("pb_user", JSON.stringify(userObj));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ ...userObj, isAdmin: userObj?.role === "admin" });
      toast.success("Login successful ✅");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong during login");
    }
  };

  // ✅ Safe logout clears all and refreshes to login page
  const logout = () => {
    localStorage.removeItem("pb_token");
    localStorage.removeItem("pb_role");
    localStorage.removeItem("pb_user");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
    toast.success("Logged out 👋");

    // Optional: auto-redirect after logout
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
