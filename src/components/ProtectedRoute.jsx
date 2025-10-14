import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}
