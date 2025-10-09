import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Loader2,
} from "lucide-react";
import API from "../api";
import toast from "react-hot-toast";
import { AuthContext } from "../App";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [wallet, setWallet] = useState(null);
  const [activeInvestments, setActiveInvestments] = useState(null);
  const [history, setHistory] = useState(null);
  const [plans, setPlans] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    if (!user) return;

    Promise.all([fetchWallet(), fetchActiveInvestments(), fetchHistory(), fetchPlans()])
      .finally(() => setPageLoading(false));
  }, [user]);

  async function fetchWallet() {
    try {
      const res = await API.get("/wallet");
      setWallet(res.data);
    } catch {
      toast.error("Failed to load wallet ❌");
    }
  }

  async function fetchActiveInvestments() {
    try {
      const res = await API.get("/investments/active");
      setActiveInvestments(res.data);
    } catch {
      toast.error("Failed to load active investments ❌");
    }
  }

  async function fetchHistory() {
    try {
      const res = await API.get("/investments/history");
      setHistory(res.data);
    } catch {
      toast.error("Failed to load history ❌");
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

  async function handleInvest() {
    if (!selectedPlan) return;
    const min = selectedPlan.minAmount;

    if (Number(amount) < min) {
      toast.error(`Minimum investment is $${min}`);
      return;
    }

    try {
      setLoading(true);
      await API.post("/investments", {
        planId: selectedPlan.id,
        amount: Number(amount),
      });
      toast.success("✅ Investment started!");
      setShowModal(false);
      setAmount("");
      fetchWallet();
      fetchActiveInvestments();
      fetchHistory();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to invest ❌");
    } finally {
      setLoading(false);
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

  // Progress bar component with live updates
  function InvestmentProgress({ investment }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      function updateProgress() {
        const now = new Date();
        const start = new Date(investment.startDate);
        const end = new Date(investment.endDate);
        const total = end - start;
        const passed = now - start;
        let pct = (passed / total) * 100;
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;
        setProgress(pct);
      }

      updateProgress();
      const interval = setInterval(updateProgress, 1000);
      return () => clearInterval(interval);
    }, [investment]);

    return (
      <div className="mt-3">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{progress.toFixed(1)}% complete</p>
      </div>
    );
  }

  // ✅ Global Loader
  if (pageLoading) {
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
                <h2 className="text-2xl font-bold text-indigo-700">
                  ${wallet.balance}
                </h2>
              </div>
              <div className="p-6 rounded-2xl shadow bg-green-50 border border-green-100">
                <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                <p className="text-gray-600">Total Profit</p>
                <h2 className="text-2xl font-bold text-green-700">
                  ${wallet.profit || 0}
                </h2>
              </div>
              <div className="p-6 rounded-2xl shadow bg-yellow-50 border border-yellow-100">
                <ArrowUpCircle className="h-8 w-8 text-yellow-600 mb-2" />
                <p className="text-gray-600">Active Investments</p>
                <h2 className="text-2xl font-bold text-yellow-700">
                  {activeInvestments ? activeInvestments.length : 0}
                </h2>
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

        {/* Active Investments */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Active Investments
        </h2>
        {!activeInvestments ? (
          <SkeletonCard />
        ) : activeInvestments.length === 0 ? (
          <p className="text-gray-500">No active investments right now.</p>
        ) : (
          <div className="grid gap-6 mb-12">
            {activeInvestments.map((inv) => (
              <div
                key={inv.id}
                className="p-6 bg-white rounded-2xl shadow border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {inv.plan?.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {inv.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">Amount: ${inv.amount}</p>
                <p className="text-gray-600">ROI: {inv.plan?.roi}%</p>
                <p className="text-gray-600">
                  Duration: {inv.plan?.duration} days
                </p>
                <InvestmentProgress investment={inv} />
              </div>
            ))}
          </div>
        )}

        {/* Investment History */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Investment History
        </h2>
        {!history ? (
          <SkeletonCard />
        ) : history.length === 0 ? (
          <p className="text-gray-500">No past investments yet.</p>
        ) : (
          <div className="grid gap-6 mb-12">
            {history.map((inv) => (
              <div
                key={inv.id}
                className="p-6 bg-white rounded-2xl shadow border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {inv.plan?.name}
                  </h3>
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
                <p className="text-gray-600">ROI: {inv.plan
