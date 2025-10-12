import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/wallet", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser({
          name: res.data.name || "User",
          email: res.data.email || "user@email.com",
          isAdmin: res.data.isAdmin || false,
        });
      })
      .catch(() => {
        localStorage.removeItem("pb_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Login: store token and fetch user info again
  const login = async (token) => {
    localStorage.setItem("pb_token", token);
    toast.success("Login successful");

    try {
      const res = await API.get("/wallet", { headers: { Authorization: `Bearer ${token}` } });
      setUser({
        name: res.data.name || "User",
        email: res.data.email || "user@email.com",
        isAdmin: res.data.isAdmin || false,
      });
    } catch {
      setUser({ name: "User", email: "user@email.com", isAdmin: false });
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("pb_token");
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
