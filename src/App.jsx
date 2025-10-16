import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🏠 Home Page</h1>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
}

function Login({ onLogin }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
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
}

function Dashboard({ onLogout }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
      <button
        onClick={onLogout}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Logout
      </button>
    </div>
  );
}

function AdminDashboard({ onLogout }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <button
        onClick={onLogout}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Logout
      </button>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem("role");
    return savedRole ? { role: savedRole } : null;
  });

  const handleLogin = (role) => {
    setUser({ role });
    localStorage.setItem("role", role);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("role");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
  );
}
