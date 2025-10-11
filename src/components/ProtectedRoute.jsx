import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ textAlign: "center", marginTop: 50 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

export default ProtectedRoute;
