import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

// Layouts & UI
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// User Pages
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import SettingsPage from "./pages/SettingsPage";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminDeposits from "./admin/AdminDeposits";
import AdminWithdrawals from "./admin/AdminWithdrawals";
import AdminPlans from "./admin/AdminPlans";

export default function App() {
  const location = useLocation();
  const { user, loading } = useAuth();

  // Hide Navbar on auth/public pages
  const noNavbarRoutes = ["/", "/login", "/signup", "/verify-email", "/verify-notice"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-lg text-indigo-600">
        Loading...
      </div>
    );

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />

        {/* 👤 User Routes (Protected) */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/deposit"
          element={user ? <Deposit /> : <Navigate to="/login" />}
        />
        <Route
          path="/withdraw"
          element={user ? <Withdraw /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={user ? <SettingsPage /> : <Navigate to="/login" />}
        />

        {/* 🛠️ Admin Routes (Protected) */}
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/deposits"
          element={
            user?.role === "admin" ? <AdminDeposits /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/withdrawals"
          element={
            user?.role === "admin" ? <AdminWithdrawals /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/plans"
          element={user?.role === "admin" ? <AdminPlans /> : <Navigate to="/" />}
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center text-gray-600 text-xl">
              404 — Page Not Found
            </div>
          }
        />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
  }
