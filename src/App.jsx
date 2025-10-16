import React, { useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

// ---- Pages ----
const LandingPage = () => (
  <div className="p-6 text-center">
    <h1 className="text-3xl font-bold mb-4">Welcome to Profit Bliss 🌟</h1>
    <Link
      to="/login"
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      Get Started
    </Link>
  </div>
);

const Login = ({ onLogin }) => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-semibold mb-4">Login</h2>
    <div className="space-x-4">
      <button
        onClick={() => onLogin("user")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Login as User
      </button>
      <button
        onClick={() => onLogin("admin")}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Login as Admin
      </button>
    </div>
  </div>
);

const Signup = () => (
  <div className="p-6 text-center">
    <h2 className="text-xl font-semibold mb-4">Signup</h2>
    <p>Signup form goes here...</p>
    <Link to="/login" className="text-indigo-600 underline">
      Already have an account? Login
    </Link>
  </div>
);

const Dashboard = ({ onLogout }) => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-semibold mb-4">📊 User Dashboard</h2>
    <p>Welcome user! This is your dashboard.</p>
    <button
      onClick={onLogout}
      className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
);

const AdminDashboard = ({ onLogout }) => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-semibold mb-4">🛠 Admin Dashboard</h2>
    <p>Welcome admin! Manage everything here.</p>
    <button
      onClick={onLogout}
      className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
);

// ---- Navbar ----
function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white flex justify-around py-2 shadow-md">
      <Link to="/dashboard" className="hover:text-gray-200">
        Dashboard
      </Link>
      <Link to="/settings" className="hover:text-gray-200">
        Settings
      </Link>
      <Link to="/plans" className="hover:text-gray-200">
        Plans
      </Link>
    </nav>
  );
}

// ---- Main App ----
export default function App() {
  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem("role");
    return savedRole ? { role: savedRole } : null;
  });

  const location = useLocation();

  const hideNavbarOn = ["/", "/login", "/signup"];
  const hideNavbar =
    hideNavbarOn.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  const handleLogin = (role) => {
    setUser({ role });
    localStorage.setItem("role", role);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("role");
  };

  return (
    <div className="pb-16">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            user && user.role === "user" ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
  }
