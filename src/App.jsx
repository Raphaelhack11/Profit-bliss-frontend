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

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

// Verification page
import VerifyEmail from "./pages/VerifyEmail";

// ✅ Auth context (optional if you already added)
import { AuthProvider, useAuth } from "./authContext";

function AppRoutes() {
  const location = useLocation();
  const pathname = location.pathname;

  const isAuthenticated = !!localStorage.getItem("pb_token");
  const role = localStorage.getItem("pb_role");
  const isAdmin = role === "admin";

  const publicPaths = ["/", "/login", "/signup", "/verify-email"];
  const isPublic = publicPaths.includes(pathname);
  const defaultHome = isAdmin ? "/admin/dashboard" : "/dashboard";

  return (
    <div className="min-h-screen bg-white text-blue-800">
      <main
        className={
          isPublic ? "pt-6 pb-10" : "pt-6 pb-24 container mx-auto px-4"
        }
      >
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={defaultHome} replace />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* Login & Signup */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={defaultHome} replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to={defaultHome} replace />
              ) : (
                <Signup />
              )
            }
          />

          {/* Email Verification */}
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* User Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : !isAdmin ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AdminDashboard />
              )
            }
          />
          <Route
            path="/admin/deposits"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : !isAdmin ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AdminDeposits />
              )
            }
          />
          <Route
            path="/admin/withdrawals"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : !isAdmin ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AdminWithdrawals />
              )
            }
          />
          <Route
            path="/admin/plans"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : !isAdmin ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AdminPlans />
              )
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center text-gray-600">
                Page not found
              </div>
            }
          />
        </Routes>
      </main>

      {/* BottomNav */}
      {isAuthenticated && !isPublic && !isAdmin && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
    }
