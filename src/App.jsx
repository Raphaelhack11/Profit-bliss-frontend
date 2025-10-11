// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";
import Settings from "./pages/Settings";

// Admin pages (folder: src/pages/admin)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

// Components
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const location = useLocation();
  const pathname = location.pathname;

  // quick auth checks from localStorage (keeps this simple)
  const isAuthenticated = !!localStorage.getItem("pb_token");
  const role = localStorage.getItem("pb_role");
  const isAdmin = role === "admin";

  // public routes where we don't show BottomNav
  const publicPaths = ["/", "/login", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  const defaultHome = isAdmin ? "/admin/dashboard" : "/dashboard";

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Landing / Public */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={defaultHome} replace /> : <LandingPage />}
        />

        {/* Auth */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={defaultHome} replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to={defaultHome} replace /> : <Signup />}
        />

        {/* User protected routes (wrap with ProtectedRoute) */}
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
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Admin protected routes (adminOnly prop expected by your ProtectedRoute) */}
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

        {/* Fallback -> landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Only show BottomNav when logged in, not on public pages and not for admin */}
      {isAuthenticated && !isPublic && !isAdmin && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
  }
