import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../App";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  // ✅ Wait for user to be hydrated from localStorage
  if (user === null) return <div className="p-8 text-center">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
