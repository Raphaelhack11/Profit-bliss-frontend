import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./authContext";

// 🔹 Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// 🔹 Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyNotice from "./pages/VerifyNotice";
import VerifyEmail from "./pages/VerifyEmail";

// 🔹 User pages
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Wallet from "./pages/Wallet";
import Deposit from "./pages/Deposit";
import SettingsPage from "./pages/SettingsPage";
import History from "./pages/History";

// 🔹 Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminInvestments from "./pages/admin/AdminInvestments";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />

        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-notice" element={<VerifyNotice />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />

          {/* ===== USER ROUTES (with Navbar) ===== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Dashboard />
                  <Navbar />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/plans"
            element={
              <ProtectedRoute>
                <>
                  <Plans />
                  <Navbar />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <>
                  <Wallet />
                  <Navbar />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <>
                  <Deposit />
                  <Navbar />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <>
                  <History />
                  <Navbar />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <>
                  <Settings />
                  <Navbar />
                </>
              </ProtectedRoute>
            }
          />

          {/* ===== ADMIN ROUTES (NO NAVBAR) ===== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
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
          <Route
            path="/admin/investments"
            element={
              <ProtectedRoute adminOnly>
                <AdminInvestments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute adminOnly>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
