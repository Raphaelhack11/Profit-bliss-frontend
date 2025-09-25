import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import API from "../api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) return;

    fetchWallet();
    fetchInvestments();
    fetchPlans();
  }, []);

  async function fetchWallet() {
    try {
      const res = await API.get("/wallet");
      setWallet(res.data);
    } catch {
      toast.error("Failed to load wallet ❌");
    }
  }

  async function fetchInvestments() {
    try {
      const res = await API.get("/investments");
      setInvestments(res.data);
    } catch {
      toast.error("Failed to load investments ❌");
    }
  }

  async function fetchPlans() {
    try {
      const res = await API.get("/plans");
      setPlans(res.data);
    } catch {
      toast.error("Failed to load plans ❌");
    }
  }

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="p-6 rounded-2xl shadow bg-gray-100 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-indigo-700">Dashboard</h1>

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {wallet ? (
            <>
              <div className="p-6 rounded-2xl shadow bg-indigo-50 border border-indigo-100">
                <Wallet className="h-8 w-8 text-indigo-600 mb-2" />
                <p className="text-gray-600">Wallet Balance</p>
                <h2 className="text-2xl font-bold text-indigo-700">${wallet.balance}</h2>
              </div>
              <div className="p-6 rounded-2xl shadow bg-green-50 border border-green-100">
                <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                <p className="text-gray-600">Total Profit</p>
                <h2 className="text-2xl font-bold text-green-700">${wallet.profit}</h2>
              </div>
              <div className="p-6 rounded-2xl shadow bg-yellow-50 border border-yellow-100">
                <ArrowUpCircle className="h-8 w-8 text-yellow-600 mb-2" />
                <p className="text-gray-600">Active Investments</p>
                <h2 className="text-2xl font-bold text-yellow-700">{investments ? investments.length : 0}</h2>
              </div>
            </>
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-10">
          <Link
            to="/deposit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition transform hover:scale-105"
          >
            <ArrowDownCircle className="h-5 w-5" /> Deposit
          </Link>
          <Link
            to="/withdraw"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition transform hover:scale-105"
          >
            <ArrowUpCircle className="h-5 w-5" /> Withdraw
          </Link>
        </div>

        {/* Investments */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Investments</h2>
        {!investments ? (
          <div className="grid gap-6 mb-12">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : investments.length === 0 ? (
          <p className="text-gray-500">You don’t have any active investments yet.</p>
        ) : (
          <div className="grid gap-6 mb-12">
            {investments.map((inv) => (
              <div key={inv.id} className="p-6 bg-white rounded-2xl shadow border border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-indigo-700">{inv.plan?.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      inv.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">Amount: ${inv.amount}</p>
                <p className="text-gray-600">ROI: {inv.plan?.roi}%</p>
                <p className="text-gray-600">Duration: {inv.plan?.duration} days</p>
              </div>
            ))}
          </div>
        )}

        {/* Plans */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Plans</h2>
        {!plans ? (
          <div className="grid gap-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : plans.length === 0 ? (
          <p className="text-gray-500">No plans available.</p>
        ) : (
          <div className="grid gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="p-6 bg-white rounded-2xl shadow border border-gray-100">
                <h3 className="text-lg font-semibold text-indigo-700">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
                <p className="text-gray-600">ROI: {plan.roi}%</p>
                <p className="text-gray-600">Duration: {plan.duration} days</p>
                <p className="text-gray-600">Minimum: ${plan.minAmount}</p>
                <p className="text-gray-600">Maximum: ${plan.maxAmount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
                }
