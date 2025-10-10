import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Admin-only route protection
  if (adminOnly && !user.isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

export default ProtectedRoute;
