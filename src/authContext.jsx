import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on load, verify token by calling /wallet (or /me if available)
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/wallet")
      .then((res) => {
        // adapt to returned wallet/user payload from backend
        // If your wallet endpoint returns wallet only, you may want to call /auth/me instead.
        const data = res.data;
        setUser({
          name: data.name || JSON.parse(localStorage.getItem("pb_user"))?.name,
          email: data.email || JSON.parse(localStorage.getItem("pb_user"))?.email,
          role: localStorage.getItem("pb_role") || "user",
          isAdmin: localStorage.getItem("pb_role") === "admin"
        });
      })
      .catch(() => {
        localStorage.removeItem("pb_token");
        localStorage.removeItem("pb_role");
        localStorage.removeItem("pb_user");
      })
      .finally(() => setLoading(false));
  }, []);

  const loginAction = (token, userObj) => {
    localStorage.setItem("pb_token", token);
    if (userObj?.role) localStorage.setItem("pb_role", userObj.role);
    if (userObj) localStorage.setItem("pb_user", JSON.stringify(userObj));
    setUser({ ...userObj, isAdmin: userObj?.role === "admin" });
    toast.success("Login successful");
  };

  const logout = () => {
    localStorage.removeItem("pb_token");
    localStorage.removeItem("pb_role");
    localStorage.removeItem("pb_user");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
