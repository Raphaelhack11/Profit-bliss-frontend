import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage"; // ✅ your landing page

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="pt-20 pb-24 container mx-auto px-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} /> {/* ✅ FIXED */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes with BottomNav */}
          <Route element={<ProtectedWithNav />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<div className="p-8">Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

// ✅ Wrapper to show BottomNav only on protected pages
import { Outlet } from "react-router-dom";
function ProtectedWithNav() {
  return (
    <>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
      <BottomNav /> {/* shows only when user is logged in */}
    </>
  );
    
