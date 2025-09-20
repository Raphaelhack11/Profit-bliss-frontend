import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    API.get("/plans")
      .then((r) => setPlans(r.data))
      .catch(() => toast.error("Failed to load plans ❌"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center shadow">
        <h1 className="text-xl font-bold">Profit Bliss</h1>
        <p className="text-sm opacity-90">Choose the right investment plan</p>
      </header>

      {/* Plans */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Investment Plans</h2>

        {plans.length === 0 ? (
          <p className="text-gray-500">No plans available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {p.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${p.minAmount} • {p.duration} days
                    </div>
                  </div>
                  <div className="text-3xl font-semibold text-green-500">
                    {p.roi}%
                  </div>
                </div>
                <div className="mt-4">
                  <InvestButton plan={p} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InvestButton({ plan }) {
  const [loading, setLoading] = useState(false);

  const invest = async () => {
    setLoading(true);
    try {
      await API.post("/investments", {
        planId: plan.id,
        amount: plan.minAmount,
      });
      toast.success(`Investment in ${plan.name} started 🎉`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Investment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={invest}
      disabled={loading}
      className={`w-full px-4 py-2 rounded-lg font-semibold transition ${
        loading
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90"
      }`}
    >
      {loading ? "Processing..." : `Invest $${plan.minAmount}`}
    </button>
  );
          }
