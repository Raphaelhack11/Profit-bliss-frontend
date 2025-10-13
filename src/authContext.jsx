import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, name, role, isAdmin }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check auth token and fetch lightweight user info (wallet route used previously)
    async function bootstrap() {
      const token = localStorage.getItem("pb_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // call a cheap authenticated endpoint to validate token & get user info
        const res = await API.get("/wallet"); // your backend returns wallet + maybe user info
        // backend may not return user fields: attempt to grab what exists
        const payloadUser = res.data.user || {
          name: res.data.name || null,
          email: res.data.email || null,
        };

        // If backend doesn't return user, try to read pb_user fallback
        const localUser = JSON.parse(localStorage.getItem("pb_user") || "null");

        setUser({
          id: payloadUser.id || localUser?.id || null,
          name: payloadUser.name || localUser?.name || null,
          email: payloadUser.email || localUser?.email || null,
          role: localUser?.role || "user",
          isAdmin: (localUser?.role || "user") === "admin",
        });
      } catch (err) {
        console.warn("Auth bootstrap failed, clearing token.", err?.message || err);
        localStorage.removeItem("pb_token");
        localStorage.removeItem("pb_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, []);

  const login = ({ token, user: backendUser }) => {
    if (token) localStorage.setItem("pb_token", token);
    if (backendUser) localStorage.setItem("pb_user", JSON.stringify(backendUser));
    setUser({
      id: backendUser?.id || null,
      name: backendUser?.name || null,
      email: backendUser?.email || null,
      role: backendUser?.role || "user",
      isAdmin: backendUser?.role === "admin",
    });
    toast.success("Logged in");
  };

  const logout = () => {
    localStorage.removeItem("pb_token");
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
export default AuthContext;
