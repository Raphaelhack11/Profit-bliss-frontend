import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("pb_role");

  // No token = not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Not an admin = redirect to dashboard (or landing)
  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Authenticated admin — allow access
  return children;
};

export default AdminRoute;
