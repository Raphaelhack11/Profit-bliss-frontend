import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { useAuth } from "./authContext";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// User Pages
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Plans from "./pages/Plans";
import SettingsPage from "./pages/SettingsPage";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

export default function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hiddenNavbarRoutes = [
    "/", 
    "/login", 
    "/signup", 
    "/verify-email", 
    "/verify-notice"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />

        {/* ---------- USER ROUTES ---------- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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

        {/* ---------- ADMIN ROUTES ---------- */}
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
      </Routes>

      {/* ---------- NAVBAR (only visible for normal users, not admin or public) ---------- */}
      {user && 
        user.role !== "admin" && 
        !hiddenNavbarRoutes.includes(location.pathname) && (
          <Navbar />
        )}
    </div>
  );
        }
