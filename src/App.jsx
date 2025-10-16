import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// User pages
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

// ✅ Optional pages — safe imports with toast warnings
let SettingsPage, VerifyEmail, VerifyNotice;
try {
  SettingsPage = require("./pages/SettingsPage").default;
} catch {
  toast.error("⚠️ Settings page not available");
  SettingsPage = () => (
    <div className="p-6 text-center text-gray-500">
      Settings page unavailable ⚠️
    </div>
  );
}

try {
  VerifyEmail = require("./pages/VerifyEmail").default;
} catch {
  toast.error("⚠️ Verify Email page not available");
  VerifyEmail = () => (
    <div className="p-6 text-center text-gray-500">
      Verify Email page unavailable ⚠️
    </div>
  );
}

try {
  VerifyNotice = require("./pages/VerifyNotice").default;
} catch {
  toast.error("⚠️ Verify Notice page not available");
  VerifyNotice = () => (
    <div className="p-6 text-center text-gray-500">
      Verify Notice page unavailable ⚠️
    </div>
  );
}

export default function App() {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-indigo-600 font-semibold">
        Loading...
      </div>
    );
  }

  // Hide navbar on specific routes
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    ["/", "/login", "/signup", "/verify-email", "/verify-notice"].includes(
      location.pathname
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />

        {/* Protected User Routes */}
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
          path="/history"
          element={
            <ProtectedRoute>
              <History />
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
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/deposits"
          element={
            <AdminRoute>
              <AdminDeposits />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/withdrawals"
          element={
            <AdminRoute>
              <AdminWithdrawals />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <AdminRoute>
              <AdminPlans />
            </AdminRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideNavbar && <Navbar />}
    </div>
  );
}
