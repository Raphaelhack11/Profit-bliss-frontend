import React, { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  const loadWithdrawals = async () => {
    try {
      const res = await API.get("/admin/withdrawals");
      setWithdrawals(res.data);
    } catch (err) {
      toast.error("Failed to fetch withdrawals ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === "approve") {
        await API.post(`/admin/withdrawals/${id}/approve`);
        toast.success("Withdrawal approved ✅");
      } else {
        await API.post(`/admin/withdrawals/${id}/reject`);
        toast.error("Withdrawal rejected ❌");
      }
      loadWithdrawals(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.error || "Action failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Nav */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin - Withdrawals</h1>
        <div className="space-x-4">
          <Link to="/admin" className="text-gray-600 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link
            to="/admin/deposits"
            className="text-gray-600 hover:text-indigo-600"
          >
            Deposits
          </Link>
        </div>
      </nav>

      {/* ✅ Withdrawals Table */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Pending Withdrawals
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : withdrawals.length === 0 ? (
          <p className="text-gray-500">No withdrawals found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="p-3">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Wallet Address</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr
                    key={w.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{w.user?.email}</td>
                    <td className="p-3 font-semibold">${w.amount}</td>
                    <td className="p-3">{w.method}</td>
                    <td className="p-3">{w.walletAddress}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          w.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : w.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(w.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 flex gap-2">
                      {w.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleAction(w.id, "approve")}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(w.id, "reject")}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
          }
