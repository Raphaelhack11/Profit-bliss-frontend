import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./authContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

// Verify
import VerifyEmail from "./pages/VerifyEmail";

function AppRoutes() {
  const location = useLocation();
  const pathname = location.pathname;

  const { user, loading } = useAuth();
  const isAuthenticated = !!localStorage.getItem("pb_token");
  const role = localStorage.getItem("pb_role");
  const isAdmin = role === "admin";

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  const publicPaths = ["/", "/login", "/signup", "/verify-email"];
  const isPublic = publicPaths.includes(pathname);
  const defaultHome = isAdmin ? "/admin/dashboard" : "/dashboard";

  return (
    <div className="min-h-screen bg-white text-blue-800">
      <main className={isPublic ? "pt-6 pb-10" : "pt-6 pb-24 container mx-auto px-4"}>
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

          {/* Auth */}
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

          {/* Verify */}
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected (User) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Admin */}
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
            element={<div className="p-8 text-center text-gray-600">Page not found</div>}
          />
        </Routes>
      </main>

      {/* Bottom Nav */}
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
