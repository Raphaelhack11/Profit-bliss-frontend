import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
