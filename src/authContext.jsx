import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) return setLoading(false);

    API.get("/wallet", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser({
          name: res.data.name || "User",
          email: res.data.email || "user@email.com",
          isAdmin: res.data.isAdmin || false,
        });
      })
      .catch(() => localStorage.removeItem("pb_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = (token) => {
    localStorage.setItem("pb_token", token);
    toast.success("Login successful");
    setUser({ loggedIn: true });
  };

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
