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
      toast.error("Failed to load transactions");
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

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Transaction History</h2>

      <div className="space-y-4">
        {txns.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <div className="font-semibold text-slate-800">
                {t.type === "deposit" ? "Deposit" : "Withdraw"} — ${t.amount}
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
  );
                }
