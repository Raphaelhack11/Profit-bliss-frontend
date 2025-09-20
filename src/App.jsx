// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import LandingPage from "./pages/LandingPage";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;

  // Simple auth check (replace with your auth/context check if you have one)
  const isAuthenticated = !!localStorage.getItem("token");

  // Paths that should be considered "public" and show full-width landing layout
  const publicPaths = ["/", "/login", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  return (
    // overall background is white so there are no colored gutters
    <div className="min-h-screen bg-white text-blue-800">
      {/* Navbar stays visible on landing and other pages */}
      <Navbar />

      {/* For public pages like landing, we want full-width layout.
          For authenticated app pages, keep the container (centered max width). */}
      <main className={isPublic ? "pt-6 pb-10" : "pt-20 pb-24 container mx-auto px-4"}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected pages — wrap with ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<div className="p-8 text-center text-gray-600">Page not found</div>} />
        </Routes>
      </main>

      {/* Bottom nav only visible when logged in and not on public pages */}
      {isAuthenticated && !isPublic && <BottomNav />}
    </div>
  );
      }
