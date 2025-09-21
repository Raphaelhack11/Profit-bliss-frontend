// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Wallet, TrendingUp, Activity } from "lucide-react";
import API from "../api";
import toast from "react-hot-toast";
import { useAuth } from "../authContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [wRes, pRes] = await Promise.all([
        API.get("/wallet"),
        API.get("/plans"),
      ]);
      setWallet(wRes.data);
      setPlans(pRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top bar with logout */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Wallet Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-blue-100">
              <Wallet size={18} /> Wallet Balance
            </div>
            <div className="text-4xl font-extrabold mt-2">
              ${wallet?.balance?.toFixed(2) ?? "0.00"}
            </div>
          </div>
          <div className="space-y-2">
            <Link
              to="/deposit"
              className="block px-4 py-2 bg-green-400 rounded-lg text-black font-semibold hover:bg-green-500 transition"
            >
              Deposit
            </Link>
            <Link
              to="/withdraw"
              className="block px-4 py-2 bg-white/20 rounded-lg text-white font-semibold hover:bg-white/30 transition"
            >
              Withdraw
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Plans */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" /> Quick Plans
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {plans.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-[1.02]"
            >
              <div className="font-bold text-lg">{p.name}</div>
              <div className="text-sm text-slate-500">
                Min: ${p.minAmount} • ROI: {p.roi}% • {p.duration} days
              </div>
              <div className="mt-3">
                <Link
                  to="/plans"
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  View & Invest
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Activity size={20} className="text-green-600" /> Activity
        </h3>
        <p className="text-slate-600 text-sm">
          Recent activity will appear here. Use the{" "}
          <Link
            to="/history"
            className="text-blue-600 font-semibold hover:underline"
          >
            History page
          </Link>{" "}
          for full details.
        </p>
      </div>

      {/* All Plans */}
      <div>
        <h3 className="text-xl font-semibold mb-4">All Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg">{p.name}</div>
                  <div className="text-sm text-slate-300">
                    Min: ${p.minAmount} • {p.duration} days
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-300">
                  {p.roi}%
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Link
                  to="/plans"
                  className="px-4 py-2 bg-yellow-400 rounded-lg text-black text-sm font-semibold hover:bg-yellow-500 transition"
                >
                  View
                </Link>
                <button
                  onClick={async () => {
                    try {
                      const amount = p.minAmount;
                      await API.post("/investments", { planId: p.id, amount });
                      toast.success("Investment started");
                      fetchData();
                    } catch (err) {
                      toast.error(
                        err.response?.data?.error || "Investment failed"
                      );
                    }
                  }}
                  className="px-4 py-2 bg-green-400 rounded-lg text-black text-sm font-semibold hover:bg-green-500 transition"
                >
                  Invest ${p.minAmount}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  }
