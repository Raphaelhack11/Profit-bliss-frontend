import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context
import { AuthProvider } from "./authContext";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoutes from "./components/AdminRoutes";
import ErrorBoundary from "./components/ErrorBoundary";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// User Pages
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";
import SettingsPage from "./pages/SettingsPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

function Layout({ children }) {
  const location = useLocation();

  // Pages where navbar should be hidden
  const hideNavbarPaths = [
    "/",
    "/login",
    "/signup",
    "/verify-notice",
    "/verify-email",
  ];

  const hideNavbar =
    hideNavbarPaths.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/verify-notice" element={<VerifyNotice />} />

              {/* Protected user routes */}
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

              {/* ✅ Admin-only routes */}
              <Route
                path="/admin/*"
                element={
                  <AdminRoutes>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="deposits" element={<AdminDeposits />} />
                      <Route path="withdrawals" element={<AdminWithdrawals />} />
                      <Route path="plans" element={<AdminPlans />} />
                      {/* Default admin redirect */}
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminRoutes>
                }
              />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>

          <Toaster position="top-center" />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
                }
