// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Nav */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="space-x-4 flex items-center">
          <Link to="/admin/deposits" className="text-gray-600 hover:text-indigo-600">
            Deposits
          </Link>
          <Link to="/admin/withdrawals" className="text-gray-600 hover:text-indigo-600">
            Withdrawals
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Content */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Welcome, Admin 👋
        </h2>
        <p className="text-gray-600">Use the navigation above to manage deposits and withdrawals.</p>
      </div>
    </div>
  );
}
