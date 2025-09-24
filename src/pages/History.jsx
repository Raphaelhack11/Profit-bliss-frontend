// src/pages/History.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function History() {
  const [tab, setTab] = useState("investments");
  const [investments, setInvestments] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllHistory();
  }, []);

  async function fetchAllHistory() {
    try {
      const [invRes, depRes, witRes] = await Promise.all([
        API.get("/investments/history"),
        API.get("/transactions?type=deposit"),
        API.get("/transactions?type=withdrawal"),
      ]);
      setInvestments(invRes.data);
      setDeposits(depRes.data);
      setWithdrawals(witRes.data);
    } catch {
      toast.error("Failed to load history ❌");
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { key: "investments", label: "Investments" },
    { key: "deposits", label: "Deposits" },
    { key: "withdrawals", label: "Withdrawals" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">
        Transaction History
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 font-semibold transition ${
              tab === t.key
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* Investments Table */}
          {tab === "investments" && (
            <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Start Date</th>
                    <th className="px-4 py-3">End Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-t border-gray-100 hover:bg-indigo-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        {inv.plan?.name}
                      </td>
                      <td className="px-4 py-3 text-green-600 font-semibold">
                        ${inv.amount.toFixed(2)}
                      </td>
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
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {investments.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-6 text-center text-gray-400"
                      >
                        No investment history yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Deposits Table */}
          {tab === "deposits" && (
            <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((dep) => (
                    <tr
                      key={dep.id}
                      className="border-t border-gray-100 hover:bg-indigo-50 transition"
                    >
                      <td className="px-4 py-3 text-green-600 font-semibold">
                        ${dep.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(dep.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            dep.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : dep.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {dep.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {deposits.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-4 py-6 text-center text-gray-400"
                      >
                        No deposit history yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Withdrawals Table */}
          {tab === "withdrawals" && (
            <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((wit) => (
                    <tr
                      key={wit.id}
                      className="border-t border-gray-100 hover:bg-indigo-50 transition"
                    >
                      <td className="px-4 py-3 text-red-600 font-semibold">
                        ${wit.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(wit.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            wit.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : wit.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {wit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {withdrawals.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-4 py-6 text-center text-gray-400"
                      >
                        No withdrawal history yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
      }
