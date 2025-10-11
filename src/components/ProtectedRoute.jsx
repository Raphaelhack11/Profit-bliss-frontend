import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // While auth is initializing
  if (loading)
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

  // If user not logged in → redirect
  if (!user) return <Navigate to="/login" replace />;

  // If route is admin-only but user isn’t admin
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render page
  return children;
};

export default ProtectedRoute;
