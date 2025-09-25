// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Manage Deposits */}
        <Link
          to="/admin/deposits"
          className="p-6 bg-white shadow rounded-lg hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Deposits</h2>
          <p className="text-gray-600 text-sm">Review and approve/reject deposit requests.</p>
        </Link>

        {/* Manage Withdrawals */}
        <Link
          to="/admin/withdrawals"
          className="p-6 bg-white shadow rounded-lg hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Withdrawals</h2>
          <p className="text-gray-600 text-sm">Approve or reject withdrawal requests.</p>
        </Link>

        {/* Manage Plans */}
        <Link
          to="/admin/plans"
          className="p-6 bg-white shadow rounded-lg hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Plans</h2>
          <p className="text-gray-600 text-sm">Add, edit, or remove investment plans.</p>
        </Link>
      </div>
    </div>
  );
        }
