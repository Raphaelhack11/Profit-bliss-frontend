import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Loader2,
  LogOut,
} from "lucide-react";
import API from "../api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();

  const [wallet, setWallet] = useState(null);
  const [activeInvestments, setActiveInvestments] = useState(null);
  const [history, setHistory] = useState(null);
  const [plans, setPlans] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const token = localStorage.getItem("pb_token");

  // ✅ Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch all dashboard data in parallel
    Promise.all([
      fetchWallet(),
      fetchActiveInvestments(),
      fetchHistory(),
      fetchPlans(),
    ])
      .catch(() => {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("pb_token");
        navigate("/login");
      })
      .finally(() => setPageLoading(false));
  }, []);

  // -----------------------------
  // Fetch Functions
  // -----------------------------
  async function fetchWallet() {
    const res = await API.get("/wallet", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setWallet(res.data);
  }

  async function fetchActiveInvestments() {
    const res = await API.get("/investments/active", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setActiveInvestments(res.data);
  }

  async function fetchHistory() {
    const res = await API.get("/investments/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHistory(res.data);
  }

  async function fetchPlans() {
    const res = await API.get("/plans", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPlans(res.data);
  }

  // -----------------------------
  // Actions
  // -----------------------------
  async function handleInvest() {
    if (!selectedPlan) return;
    if (Number(amount) < selectedPlan.minAmount) {
      toast.error(`Minimum investment is $${selectedPlan.minAmount}`);
      return;
    }

    try {
      setLoading(true);
      await API.post(
        "/investments",
        { planId: selectedPlan.id, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Investment started!");
      setShowModal(false);
      setAmount("");
      await Promise.all([fetchWallet(), fetchActiveInvestments(), fetchHistory()]);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to invest ❌");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("pb_token");
    toast.success("Logged out successfully");
    navigate("/login");
  }

  // -----------------------------
  // UI Components
  // -----------------------------
  const SkeletonCard = () => (
    <div className="p-6 rounded-2xl shadow bg-gray-100 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
    </div>
  );

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
        pct = Math.min(100, Math.max(0, pct));
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
        <p className="text-sm text-gray-600 mt-1">
          {progress.toFixed(1)}% complete
        </p>
      </div>
    );
  }

  // -----------------------------
  // Render
  // -----------------------------
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>

        {/* Wallet Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {!wallet ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
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
        <Section title="Active Investments">
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
        </Section>

        {/* History */}
        <Section title="Investment History">
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
                  <p className="text-gray-600">ROI: {inv.plan?.roi}%</p>
                  <p className="text-gray-600">
                    Duration: {inv.plan?.duration} days
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Plans */}
        <Section title="Available Plans">
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
                <div
                  key={plan.id}
                  className="p-6 bg-white rounded-2xl shadow border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600">{plan.description}</p>
                  <p className="text-gray-600">ROI: {plan.roi}%</p>
                  <p className="text-gray-600">
                    Duration: {plan.duration} days
                  </p>
                  <p className="text-gray-600">Minimum: ${plan.minAmount}</p>

                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setShowModal(true);
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    Invest Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      {/* Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">
              Invest in {selectedPlan.name}
            </h2>
            <p className="text-gray-600 mb-2">{selectedPlan.description}</p>
            <p className="text-gray-600 mb-2">ROI: {selectedPlan.roi}%</p>
            <p className="text-gray-600 mb-2">
              Duration: {selectedPlan.duration} days
            </p>
            <p className="text-gray-600 mb-4">
              Minimum Amount: ${selectedPlan.minAmount}
            </p>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount (min $${selectedPlan.minAmount})`}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleInvest}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Section Wrapper
function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </div>
  );
  }
