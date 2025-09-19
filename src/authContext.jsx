import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      setLoading(false);
      return;
    }
    // Optionally fetch user info
    API.get("/wallet")
      .then((res) => {
        // If wallet returns, user is valid; you may want a /me endpoint for real user info.
        setUser({ loggedIn: true });
      })
      .catch(() => {
        localStorage.removeItem("pb_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token) => {
    localStorage.setItem("pb_token", token);
    setUser({ loggedIn: true });
    toast.success("Logged in");
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
