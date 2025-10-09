import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

export default function ProtectedRoute() {
  const { user, loading, debug } = useAuth();

  if (loading) return <div className="p-8 text-center">Loading user...</div>;
  if (!user)
    return (
      <div className="p-8 text-center text-gray-700">
        <p>❌ Not logged in — redirecting...</p>
        <pre className="bg-gray-100 text-xs p-2 mt-3 rounded">{debug}</pre>
        <Navigate to="/login" replace />
      </div>
    );

  return <Outlet />;
}
