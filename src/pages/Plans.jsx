// src/pages/Plans.jsx
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
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gray-800 text-indigo-400 p-6 text-center shadow-md">
        <h1 className="text-2xl font-bold">crypto.base</h1>
        <p className="text-sm text-gray-400">
          Choose the right investment plan
        </p>
      </header>

      {/* Plans */}
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Investment Plans
        </h2>

        {plans.length === 0 ? (
          <p className="text-gray-400 text-center">No plans available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xl font-bold text-indigo-400">
                      {p.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      Min: ${p.minAmount} • {p.duration} days
                    </div>
                  </div>
                  <div className="text-3xl font-semibold text-green-400">
                    {p.roi}%
                  </div>
                </div>
                <div className="mt-6">
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
      await API.post("/investments/subscribe", {
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
      className={`w-full px-4 py-3 rounded-lg font-semibold transition ${
        loading
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
      }`}
    >
      {loading ? "Processing..." : `Invest $${plan.minAmount}`}
    </button>
  );
}
