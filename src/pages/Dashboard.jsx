// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, Activity } from "lucide-react";
import API from "../api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
    fetchUser();
    fetchPlans();
    fetchActivity();
  }, []);

  async function fetchWallet() {
    try {
      const res = await API.get("/wallet");
      setWallet(res.data);
    } catch {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user");
    }
  }

  async function fetchPlans() {
    try {
      const res = await API.get("/plans");
      setPlans(res.data);
    } catch {
      toast.error("Failed to load plans");
    }
  }

  async function fetchActivity() {
    try {
      const res = await API.get("/investments/history");
      setActivities(res.data.slice(0, 5)); // show latest 5
    } catch {
      toast.error("Failed to load activity");
    }
  }

  async function handleInvest(plan) {
    try {
      await API.post("/investments", {
        planId: plan.id,
        amount: plan.minAmount,
      });
      toast.success(`Invested in ${plan.name} successfully!`);
      fetchWallet();
      fetchActivity();
    } catch (err) {
      toast.error(err.response?.data?.error || "Investment failed");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Title */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white">
        <h2 className="text-2xl font-bold">
          Welcome, {user?.name || "Investor"}
        </h2>
        <p className="text-gray-400 text-sm">Here’s your financial overview</p>
      </div>

      {/* Wallet Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 rounded-xl shadow-lg text-white">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-indigo-200">
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
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-400">
          <TrendingUp size={20} /> Quick Plans
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {plans.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="p-4 bg-gray-800 rounded-xl shadow hover:shadow-lg transition transform hover:scale-[1.02]"
            >
              <div className="font-bold text-lg text-white">{p.name}</div>
              <div className="text-sm text-gray-400">
                Min: ${p.minAmount} • ROI: {p.roi}% • {p.duration} days
              </div>
              <div className="mt-3">
                <Link
                  to="/plans"
                  className="text-sm text-indigo-400 font-semibold hover:underline"
                >
                  View & Invest
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-400">
          <Activity size={20} /> Recent Activity
        </h3>
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No recent activity yet. Start by investing in a plan.
          </p>
        ) : (
          <ul className="space-y-3">
            {activities.map((inv) => (
              <li
                key={inv.id}
                className="flex justify-between items-center text-sm text-gray-300 border-b border-gray-700 pb-2"
              >
                <div>
                  <span className="font-semibold text-white">
                    {inv.plan?.name}
                  </span>{" "}
                  — ${inv.amount} invested
                  <span className="ml-2 text-xs text-gray-500">
                    {new Date(inv.startDate).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    inv.status === "active"
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-200"
                  }`}
                >
                  {inv.status}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 text-right">
          <Link
            to="/history"
            className="text-indigo-400 text-sm font-semibold hover:underline"
          >
            View All
          </Link>
        </div>
      </div>

      {/* All Plans */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">All Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg">{p.name}</div>
                  <div className="text-sm text-gray-300">
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
                  onClick={() => handleInvest(p)}
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
