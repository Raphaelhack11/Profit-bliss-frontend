import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Navigation */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="space-x-4">
          <Link
            to="/admin/deposits"
            className="text-gray-600 hover:text-indigo-600"
          >
            Deposits
          </Link>
          <Link
            to="/admin/withdrawals"
            className="text-gray-600 hover:text-indigo-600"
          >
            Withdrawals
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-red-600"
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* ✅ Stats Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-600">Total Users</h2>
          <p className="text-2xl font-bold text-indigo-600">124</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-600">Pending Deposits</h2>
          <p className="text-2xl font-bold text-yellow-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-600">Pending Withdrawals</h2>
          <p className="text-2xl font-bold text-red-600">5</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
