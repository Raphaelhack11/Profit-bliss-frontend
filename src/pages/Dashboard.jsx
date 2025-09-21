import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function Dashboard() {
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
      setPlans(pRes.data.plans || pRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 text-slate-400">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <Wallet size={32} />
            <span className="text-sm opacity-80">Wallet Balance</span>
          </div>
          <div className="mt-4 text-3xl font-extrabold">
            ${wallet?.balance?.toFixed(2) ?? "0.00"}
          </div>
          <div className="mt-6 flex gap-3">
            <Link
              to="/deposit"
              className="flex-1 bg-green-400 text-black py-2 rounded-lg font-semibold hover:bg-green-300 transition"
            >
              Deposit
            </Link>
            <Link
              to="/withdraw"
              className="flex-1 bg-white/20 py-2 rounded-lg text-white font-semibold hover:bg-white/30 transition"
            >
              Withdraw
            </Link>
          </div>
        </div>

        {/* Investments */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <TrendingUp size={32} />
            <span className="text-sm opacity-80">Active Investments</span>
          </div>
          <div className="mt-4 text-3xl font-extrabold">
            {plans.length > 0 ? plans.length : 0}
          </div>
          <div className="mt-6">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition"
            >
              Explore Plans <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <Activity size={32} />
            <span className="text-sm opacity-80">Recent Activity</span>
          </div>
          <div className="mt-4 text-sm opacity-90">
            Your latest transactions will appear here.
          </div>
          <div className="mt-6">
            <Link
              to="/history"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition"
            >
              View History <ArrowDownRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Plans */}
      <div className="bg-slate-900/80 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Layers size={20} /> Quick Plans
        </h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {plans.slice(0, 6).map((p) => (
            <div
              key={p.id || p.name}
              className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 text-white hover:scale-105 transform transition"
            >
              <div className="font-semibold text-lg">{p.name}</div>
              <div className="text-sm text-slate-300 mt-1">
                Min: ${p.minAmount}
              </div>
              <div className="text-sm text-slate-400">{p.roi}% ROI</div>
              <div className="mt-3">
                <Link
                  to="/plans"
                  className="text-xs text-yellow-300 hover:text-yellow-200"
                >
                  View & Invest
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Plans */}
      <div className="bg-slate-900/80 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Layers size={20} /> All Plans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id || p.name}
              className="p-5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 text-white shadow hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-xl">{p.name}</div>
                  <div className="text-sm text-slate-400">
                    Min ${p.minAmount} • {p.duration} days
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-green-400">
                  {p.roi}%
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Link
                  to="/plans"
                  className="flex-1 px-3 py-2 bg-yellow-300 text-black rounded-lg text-sm font-semibold text-center hover:bg-yellow-400 transition"
                >
                  View
                </Link>
                <button
                  onClick={async () => {
                    try {
                      const amount = p.minAmount;
                      await API.post("/investments", { planId: p.id, amount });
                      toast.success("Investment started");
                    } catch (err) {
                      toast.error(
                        err.response?.data?.error || "Investment failed"
                      );
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-lg text-sm font-semibold hover:opacity-90 transition"
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
