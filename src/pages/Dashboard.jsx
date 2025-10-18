import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  Loader2,
  X,
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
  const [modalPlan, setModalPlan] = useState(null);
  const [investAmount, setInvestAmount] = useState("");

  const token = localStorage.getItem("pb_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchData();

    // Deposit alert only at bottom-right
    const timer = setTimeout(() => {
      toast.custom(
        (t) => <DepositAlert visible={t.visible} message="Deposit Successful ✅" />,
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
      toast.error("Failed to load dashboard data", { position: "top-right" });
      if (err.response?.status === 401) {
        localStorage.removeItem("pb_token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleInvest(plan) {
    const amount = parseFloat(investAmount);
    if (!amount || amount < plan.minAmount) {
      toast.error(`Minimum investment is $${plan.minAmount}`, { position: "top-right" });
      return;
    }
    if (amount > wallet.balance) {
      toast.error("Insufficient balance", { position: "top-right" });
      return;
    }

    try {
      // API call to invest
      const res = await API.post(
        "/invest",
        { planId: plan.id, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update wallet balance
      setWallet((prev) => ({ ...prev, balance: prev.balance - amount }));

      // Add new transaction
      const newTx = {
        id: res.data.id,
        type: "investment",
        amount,
        status: "completed",
        createdAt: new Date().toISOString(),
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Add investment
      const newInv = {
        id: res.data.investmentId,
        plan,
        amount,
        daysCompleted: 0,
        status: "active",
      };
      setInvestments((prev) => [newInv, ...prev]);

      toast.success(`Invested $${amount} in ${plan.name} ✅`, { position: "top-right" });
      setModalPlan(null);
      setInvestAmount("");
    } catch (err) {
      console.error("Invest error:", err);
      toast.error("Investment failed", { position: "top-right" });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
        <p className="animate-pulse text-lg font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-8">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">Welcome Back 👋</h1>
            <p className="text-gray-500">Manage your wallet, plans, and investments.</p>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-indigo-600 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Wallet Balance</p>
              <h2 className="text-3xl font-bold mt-1">${wallet?.balance ?? 0}</h2>
            </div>
            <Wallet className="h-12 w-12 opacity-50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 overflow-x-auto">
            <MiniCard
              title="Total Profit"
              value={`$${wallet?.profit ?? 0}`}
              icon={<TrendingUp className="h-5 w-5 text-green-600" />}
              bg="bg-green-50"
            />
            <MiniCard
              title="Transactions"
              value={transactions.length}
              icon={<Clock className="h-5 w-5 text-yellow-600" />}
              bg="bg-yellow-50"
            />
            <MiniCard
              title="Actions"
              value=""
              icon={<ArrowDownCircle className="h-5 w-5 text-indigo-600" />}
              bg="bg-indigo-50"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 overflow-x-auto py-2">
          <ActionCard to="/deposit" label="Deposit" icon={<ArrowDownCircle />} color="bg-indigo-600" />
          <ActionCard to="/withdraw" label="Withdraw" icon={<ArrowUpCircle />} color="bg-red-600" />
          <ActionCard to="/transactions" label="History" icon={<Clock />} color="bg-yellow-600" />
        </div>

        {/* Active Investments */}
        <Section title="Active Investments">
          {investments.length === 0 ? (
            <p className="text-gray-500">No active investments yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {investments.map((inv) => {
                const progress = (inv.daysCompleted / inv.plan.duration) * 100 || 0;
                return (
                  <div
                    key={inv.id}
                    className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-indigo-700">{inv.plan.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">${inv.amount} invested</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{Math.round(progress)}%</span>
                        <span>{inv.daysCompleted}/{inv.plan.duration} days</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      ROI: {inv.plan.roi}% | Status:{" "}
                      <span className={`font-semibold ${inv.status === "active" ? "text-green-600" : "text-yellow-600"}`}>
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
                  <h3 className="text-xl font-semibold text-indigo-700">{plan.name}</h3>
                  <p className="text-gray
