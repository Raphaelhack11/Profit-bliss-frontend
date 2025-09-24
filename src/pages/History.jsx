// src/pages/History.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function History() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await API.get("/investments/history");
      setInvestments(res.data);
    } catch {
      toast.error("Failed to load investment history");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg text-gray-400">
        Loading history...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Investment History</h2>

      {investments.length === 0 ? (
        <p className="text-gray-400">No investments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">End Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id} className="border-t border-gray-700">
                  <td className="px-4 py-3">{inv.plan?.name}</td>
                  <td className="px-4 py-3">${inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {new Date(inv.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(inv.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        inv.status === "active"
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-gray-200"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
