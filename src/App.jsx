import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./authContext";
import ProtectedRoute from "./components/ProtectedRoute";

// user pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Plans from "./pages/Plans";
import SettingsPage from "./pages/SettingsPage";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyNotice from "./pages/VerifyNotice";

// navbar / bottom nav for users
import Navbar from "./components/Navbar";

// admin pages (corrected file paths)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminPlans from "./pages/admin/AdminPlans";

// layout helper to hide Navbar on admin routes
function LayoutWithNav({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {children}
      {!isAdminRoute && <Navbar />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWithNav>
          <Routes>
            {/* public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/verify-notice" element={<VerifyNotice />} />

            {/* protected user pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
              path="/plans"
              element={
                <ProtectedRoute>
                  <Plans />
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

            {/* admin */}
            <Route
              path="/admin"
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
          </Routes>
        </LayoutWithNav>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
