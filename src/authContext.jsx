// src/authContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

/**
 * AuthProvider
 * - verifies token by calling a safe backend endpoint (/wallet)
 * - protects against crashes by using try/catch and always resolving loading
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email, role, isAdmin }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const token = localStorage.getItem("pb_token");
        if (!token) {
          setUser(null);
          return;
        }

        // call a light endpoint to validate token and get user info
        // NOTE: API has an interceptor that adds Authorization header
        const res = await API.get("/wallet").catch((err) => {
          // Prefer /auth/me if you add it; wallet is fine for validating token
          throw err;
        });

        // backend /wallet should return wallet + (optionally) user data
        // We'll attempt to extract user info safely
        const payloadUser = res.data.user || res.data || {};
        setUser({
          name: payloadUser.name || payloadUser.email || "User",
          email: payloadUser.email || null,
          role: payloadUser.role || localStorage.getItem("pb_role") || "user",
          isAdmin:
            (payloadUser.role || localStorage.getItem("pb_role") || "") ===
            "admin",
        });
      } catch (err) {
        // Not fatal: clear token and remain logged out
        console.warn("Auth initialization failed:", err?.message || err);
        localStorage.removeItem("pb_token");
        localStorage.removeItem("pb_role");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  // login: save token + optionally set user. Prefer backend to return user.
  const login = (token, role = null, userData = null) => {
    try {
      localStorage.setItem("pb_token", token);
      if (role) localStorage.setItem("pb_role", role);
      if (userData) localStorage.setItem("pb_user", JSON.stringify(userData));

      setUser((prev) => ({
        ...(prev || {}),
        ...(userData || {}),
        role: role || prev?.role || "user",
        isAdmin: (role || prev?.role || "user") === "admin",
      }));

      toast.success("Login successful");
    } catch (err) {
      console.error("login error", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("pb_token");
    localStorage.removeItem("pb_role");
    localStorage.removeItem("pb_user");
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
