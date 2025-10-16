import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth, AuthProvider } from "./authContext";
import Navbar from "./components/Navbar";

// Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// User pages
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import SettingsPage from "./pages/SettingsPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="p-8 text-center text-gray-600">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  return children;
}

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarOn = ["/", "/login", "/signup", "/verify-email", "/verify-notice"];
  const hideNavbar =
    hideNavbarOn.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />

        {/* User Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <Deposit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdraw"
          element={
            <ProtectedRoute>
              <Withdraw />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <ProtectedRoute adminOnly>
              <AdminPlans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/deposits"
          element={
            <ProtectedRoute adminOnly>
              <AdminDeposits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/withdrawals"
          element={
            <ProtectedRoute adminOnly>
              <AdminWithdrawals />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
