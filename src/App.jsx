import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
const Landing = () => <h1>🏠 Landing Page</h1>;
const Login = () => {
  const { login } = useAuth();
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <button onClick={() => login("user", false)}>Login as User</button>
      <button onClick={() => login("admin", true)}>Login as Admin</button>
    </div>
  );
};
const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
const AdminDashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected user route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin-only route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
