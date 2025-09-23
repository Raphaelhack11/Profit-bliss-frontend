// src/pages/History.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function History() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTxns();
  }, []);

  const loadTxns = async () => {
    setLoading(true);
    try {
      const res = await API.get("/transactions");
      setTxns(res.data);
    } catch (err) {
      toast.error("Failed to load transactions ❌");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg text-slate-600">
        Loading transactions...
      </div>
    );
  }

  if (!txns.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500">
        No transactions yet.
      </div>
    );
  }

  // Group transactions
  const deposits = txns.filter((t) => t.type === "deposit");
  const withdrawals = txns.filter((t) => t.type === "withdraw");

  // Totals
  const totalDeposits = deposits.reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Transaction History
        </h2>

        {/* Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-green-100 border-l-4 border-green-500 p-5 rounded-lg shadow">
            <h4 className="text-sm text-green-600 font-medium">
              Total Deposited
            </h4>
            <p className="text-2xl font-bold text-green-800">
              ${totalDeposits.toFixed(2)}
            </p>
          </div>
          <div className="bg-red-100 border-l-4 border-red-500 p-5 rounded-lg shadow">
            <h4 className="text-sm text-red-600 font-medium">
              Total Withdrawn
            </h4>
            <p className="text-2xl font-bold text-red-800">
              ${totalWithdrawals.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Deposits */}
        {deposits.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              💰 Deposits
            </h3>
            <div className="space-y-4">
              {deposits.map((t) => (
                <div
                  key={t.id}
                  className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold text-slate-800">
                      Deposit —{" "}
                      <span className="text-indigo-700">${t.amount}</span>
                    </div>
                    <div className="text-sm text-slate-500">
                      {t.method} • {new Date(t.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Withdrawals */}
        {withdrawals.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              📤 Withdrawals
            </h3>
            <div className="space-y-4">
              {withdrawals.map((t) => (
                <div
                  key={t.id}
                  className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold text-slate-800">
                      Withdraw —{" "}
                      <span className="text-indigo-700">${t.amount}</span>
                    </div>
                    <div className="text-sm text-slate-500">
                      {t.method} • {new Date(t.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
                               }
