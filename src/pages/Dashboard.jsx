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

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch all data
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

    // ✅ Show toast after 5 seconds
    const alertTimeout = setTimeout(() => {
      toast.success("Deposit Successful ✅", {
        duration: 4000,
        position: "bottom-right",
      });
    }, 5000);

    return () => clearTimeout(alertTimeout);
  }, []);

  // Fetch Functions
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

  // Investment action
  async function handleInvest() {
    if (!selectedPlan) return;
    if (Number(amount) < selectedPlan.minAmount) {
      toast.error(`Minimum investment is $${selectedPlan.minAmount}`, {
        position: "bottom-right",
      });
      return;
    }

    try {
      setLoading(true);
      await API.post(
        "/investments",
        { planId: selectedPlan.id, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Investment started ✅", { position: "bottom-right" });
      setShowModal(false);
      setAmount("");
      await Promise.all([fetchWallet(), fetchActiveInvestments(), fetchHistory()]);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to invest ❌", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  }

  // Investment progress
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
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {progress.toFixed(1)}% complete
        </p>
      </div>
    );
  }

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
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-8 py-8">
      <Toaster />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500">Manage your investments and track performance.</p>
        </div>

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card icon={<Wallet className="h-6 w-6 text-indigo-600" />} title="Wallet Balance">
            ${wallet?.balance ?? 0}
          </Card>
          <Card icon={<TrendingUp className="h-6 w-6 text-green-600" />} title="Total Profit">
            ${wallet?.profit ?? 0}
          </Card>
          <Card
            icon={<ArrowUpCircle className="h-6 w-6 text-yellow-600" />}
            title="Active Investments"
          >
            {activeInvestments ? activeInvestments.length : 0}
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/deposit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition-transform hover:scale-105"
          >
            <ArrowDownCircle className="h-5 w-5" /> Deposit
          </Link>
          <Link
            to="/withdraw"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-transform hover:scale-105"
          >
            <ArrowUpCircle className="h-5 w-5" /> Withdraw
          </Link>
        </div>

        {/* Active Investments */}
        <Section title="Active Investments">
          {!activeInvestments ? (
            <Skeleton />
          ) : activeInvestments.length === 0 ? (
            <p className="text-gray-500">No active investments right now.</p>
          ) : (
            <div className="grid gap-6">
              {activeInvestments.map((inv) => (
                <div
                  key={inv.id}
                  className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-indigo-700">{inv.plan?.name}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">Amount: ${inv.amount}</p>
                  <p className="text-gray-600">ROI: {inv.plan?.roi}%</p>
                  <p className="text-gray-600">Duration: {inv.plan?.duration} days</p>
                  <InvestmentProgress investment={inv} />
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* History */}
        <Section title="Investment History">
          {!history ? (
            <Skeleton />
          ) : history.length === 0 ? (
            <p className="text-gray-500">No past investments yet.</p>
          ) : (
            <div className="grid gap-6">
              {history.map((inv) => (
                <div
                  key={inv.id}
                  className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
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
        </Section>

        {/* Plans */}
        <Section title="Available Plans">
          {!plans ? (
            <Skeleton />
          ) : plans.length === 0 ? (
            <p className="text-gray-500">No plans available.</p>
          ) : (
            <div className="grid gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                  <p className="text-gray-600">ROI: {plan.roi}%</p>
                  <p className="text-gray-600">Duration: {plan.duration} days</p>
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
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
                    <Loader2 className="h-5 w-5 animate-spin" /> Processing...
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

// Reusable UI Components
function Card({ icon, title, children }) {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-indigo-700">{children}</p>
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

function Skeleton() {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-gray-100 animate-pulse h-32"></div>
  );
}
