import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ✅ Components
import Navbar from "./components/Navbar";

// ✅ User Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";

// ✅ Verification Pages
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// ✅ Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminDeposits from "./admin/AdminDeposits";
import AdminWithdrawals from "./admin/AdminWithdrawals";
import AdminPlans from "./admin/AdminPlans";
import AdminUsers from "./admin/AdminUsers";

// ✅ Context
import { AuthProvider } from "./authContext";

export default function App() {
  const location = useLocation();

  // ✅ Pages where Navbar should be hidden
  const hideNavbarPaths = [
    "/",
    "/login",
    "/signup",
    "/verify-email",
    "/verify-notice",
  ];
  const hideNavbar = hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <AuthProvider>
      <div className="bg-gray-50 min-h-screen text-gray-900">
        {/* ✅ Notification system */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* ✅ Show Navbar only when appropriate */}
        {!hideNavbar && <Navbar />}

        {/* ✅ Define Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Email Verification */}
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/verify-notice" element={<VerifyNotice />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/deposits" element={<AdminDeposits />} />
          <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
          <Route path="/admin/plans" element={<AdminPlans />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
