// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  // show loader while verifying auth
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  // no user -> redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // prevent non-admins from entering admin routes
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
             }
