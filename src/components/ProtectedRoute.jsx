import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600 font-medium">
        Loading...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
