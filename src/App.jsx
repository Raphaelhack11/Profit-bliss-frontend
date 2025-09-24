import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";
import Settings from "./pages/Settings";

import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";

// ✅ Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;

  // ✅ check if user is logged in
  const isAuthenticated = !!localStorage.getItem("pb_token");

  // ✅ Public routes (no BottomNav)
  const publicPaths = ["/", "/login", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  return (
    <div className="min-h-screen bg-white text-blue-800">
      <main className={isPublic ? "pt-6 pb-10" : "pt-6 pb-24 container mx-auto px-4"}>
        <Routes>
          {/* Landing page */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
          />

          {/* Login & Signup redirect if already logged in */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />}
          />

          {/* ✅ Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />

            {/* ✅ Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/deposits" element={<AdminDeposits />} />
            <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={<div className="p-8 text-center text-gray-600">Page not found</div>}
          />
        </Routes>
      </main>

      {/* ✅ Only show BottomNav when logged in & not on login/signup & not in admin */}
      {isAuthenticated && !isPublic && !pathname.startsWith("/admin") && <BottomNav />}
    </div>
  );
  }
