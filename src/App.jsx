import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ✅ Context
import { AuthProvider } from "./authContext";

// ✅ Components
import Navbar from "./components/Navbar";

// ✅ User Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// ✅ Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

export default function App() {
  const location = useLocation();

  // ✅ Hide Navbar on landing, login, and signup
  const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <AuthProvider>
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Conditional Navbar */}
      {!hideNavbar && <Navbar />}

      {/* App Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Authenticated User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/deposits" element={<AdminDeposits />} />
        <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
        <Route path="/admin/plans" element={<AdminPlans />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen text-center">
              <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
              <p className="text-gray-600">
                The page you’re looking for doesn’t exist.
              </p>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
      }
