import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Loader2,
} from "lucide-react";
import API from "../api";
import toast, { Toaster } from "react-hot-toast";
import DepositAlert from "../components/DepositAlert";

export default function Dashboard() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [plans, setPlans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("pb_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchData();

    const timer = setTimeout(() => {
      toast.custom(
        (t) => (
          <DepositAlert visible={t.visible} message="Deposit Successful ✅" />
        ),
        { duration: 15000, position: "bottom-right" }
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  async function fetchData() {
    try {
      const [walletRes, plansRes, txRes, invRes] = await Promise.all([
        API.get("/wallet", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/plans", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/transactions", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/investments", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setWallet(walletRes.data);
      setPlans(plansRes.data);
      setTransactions(txRes.data);
      setInvestments(invRes.data);
    } catch (err) {
      console.error("❌ Dashboard load error:", err);
      toast.error("Failed to load dashboard data", { position: "bottom-right" });
      if (err.response?.status === 401) {
        localStorage.removeItem("pb_token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
        <p className="animate-pulse text-lg font-medium">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-8 py-8">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              Welcome Back 👋
            </h1>
            <p className="text-gray-500">
              Manage your wallet, plans, and investments.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/deposit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              <ArrowDownCircle className="h-5 w-5" /> Deposit
            </Link>
            <Link
              to="/withdraw"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              <ArrowUpCircle className="h-5 w-5" /> Withdraw
            </Link>
          </div>
        </div>

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card
            icon={<Wallet className="h-6 w-6 text-indigo-600" />}
            title="Wallet Balance"
            value={`$${wallet?.balance ?? 0}`}
          />
          <Card
            icon={<TrendingUp className="h-6 w-6 text-green-600" />}
            title="Total Profit"
            value={`$${wallet?.profit ?? 0}`}
          />
          <Card
            icon={<ArrowUpCircle className="h-6 w-6 text-yellow-600" />}
            title="Total Transactions"
            value={transactions.length}
          />
        </div>

        {/* Active Investments */}
        <Section title="Active Investments">
          {investments.length === 0 ? (
            <p className="text-gray-500">You have no active investments yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {investments.map((inv) => {
                const progress =
                  (inv.daysCompleted / inv.plan.duration) * 100 || 0;
                return (
                  <div
                    key={inv.id}
                    className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-indigo-700">
                      {inv.plan.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      ${inv.amount} invested
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{Math.round(progress)}%</span>
                        <span>{inv.daysCompleted} / {inv.plan.duration} days</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      ROI: {inv.plan.roi}% | Status:{" "}
                      <span
                        className={`font-semibold ${
                          inv.status === "active"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </Section>

        {/* Available Plans */}
        <Section title="Available Plans">
          {plans.length === 0 ? (
            <p className="text-gray-500">No plans available at the moment.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                  <ul className="mt-3 text-sm text-gray-600 space-y-1">
                    <li>ROI: {plan.roi}%</li>
                    <li>Duration: {plan.duration} days</li>
                    <li>Min: ${plan.minAmount}</li>
                  </ul>
                  <button
                    className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                    onClick={() =>
                      toast.success(`Invested in ${plan.name} ✅`, {
                        position: "bottom-right",
                      })
                    }
                  >
                    Invest Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Transaction History */}
        <Section title="Recent Transactions">
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-xl">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 text-sm">
                    <th className="py-3 px-4 border-b">Type</th>
                    <th className="py-3 px-4 border-b">Amount</th>
                    <th className="py-3 px-4 border-b">Status</th>
                    <th className="py-3 px-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-gray-50 text-gray-700 text-sm"
                    >
                      <td className="py-3 px-4 border-b capitalize">{tx.type}</td>
                      <td className="py-3 px-4 border-b">${tx.amount}</td>
                      <td className="py-3 px-4 border-b">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            tx.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

// Reusable components
function Card({ icon, title, value }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-indigo-700 mt-1">{value}</h3>
        </div>
        <div className="bg-indigo-50 p-3 rounded-xl">{icon}</div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      {children}
    </section>
  );
            }
