// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Nav with Logout */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="space-x-4 flex items-center">
          <Link to="/admin/deposits" className="text-gray-600 hover:text-indigo-600">Deposits</Link>
          <Link to="/admin/withdrawals" className="text-gray-600 hover:text-indigo-600">Withdrawals</Link>
          <Link to="/admin/plans" className="text-gray-600 hover:text-indigo-600">Plans</Link>
          {/* ✅ Logout only here */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Dashboard Content */}
      <div className="p-6">
        <h2 className="text-lg font-semibold">Welcome, Admin 🎉</h2>
        <p className="text-gray-600 mt-2">
          Use the links above to manage deposits, withdrawals, and investment plans.
        </p>
      </div>
    </div>
  );
          }
