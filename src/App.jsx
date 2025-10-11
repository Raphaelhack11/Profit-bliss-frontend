import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

// 🪩 Global error listener (helps find crashes)
window.addEventListener("error", (e) => {
  console.error("Global Error:", e.message, e.filename, e.lineno);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise:", e.reason);
});

// ✅ Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ✅ User pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import SettingsPage from "./pages/SettingsPage";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// ✅ Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

// ✅ Components
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <>
      {/* 🏠 Public routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✉️ Verification */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />

        {/* 👤 User routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
              <BottomNav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <Deposit />
              <BottomNav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdraw"
          element={
            <ProtectedRoute>
              <Withdraw />
              <BottomNav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
              <BottomNav />
            </ProtectedRoute>
          }
        />

        {/* 🧑‍💼 Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
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
        <Route
          path="/admin/plans"
          element={
            <ProtectedRoute adminOnly>
              <AdminPlans />
            </ProtectedRoute>
          }
        />

        {/* 🚦 Default fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
      }
