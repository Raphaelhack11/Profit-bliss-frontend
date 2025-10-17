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
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [inv, dep, wit] = await Promise.all([
        API.get("/investments/history"),
        API.get("/transactions?type=deposit"),
        API.get("/transactions?type=withdrawal"),
      ]);
      setInvestments(inv.data);
      setDeposits(dep.data);
      setWithdrawals(wit.data);
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

  const activeData =
    tab === "investments"
      ? investments
      : tab === "deposits"
      ? deposits
      : withdrawals;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-10">
          Transaction History
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8 border-b border-gray-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`pb-3 font-semibold transition ${
                tab === t.key
                  ? "text-purple-700 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-purple-100">
            <table className="w-full text-sm text-left">
              <thead className="bg-purple-50 text-purple-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeData.length > 0 ? (
                  activeData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-purple-50 transition"
                    >
                      <td
                        className={`px-6 py-3 font-semibold ${
                          tab === "withdrawals"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        ${item.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-6 text-center text-gray-400"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
        }
