import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    try {
      const res = await API.get("/plans");
      setPlans(res.data);
    } catch {
      toast.error("Failed to load plans ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900 px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text mb-4">
          Investment Plans
        </h2>
        <p className="text-gray-600 mb-12">
          Choose a plan that fits your goals and start earning today!
        </p>

        {loading ? (
          <div className="text-gray-500 text-lg">Loading plans...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl border border-purple-100 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                  {plan.name}
                </h3>
                <p className="text-gray-500 mb-4">{plan.description}</p>

                <div className="space-y-1 text-gray-700">
                  <p>
                    <strong>Min Amount:</strong> ${plan.minAmount}
                  </p>
                  <p>
                    <strong>ROI:</strong> {plan.roi}%
                  </p>
                  <p>
                    <strong>Duration:</strong> {plan.duration} days
                  </p>
                </div>

                <button
                  onClick={async () => {
                    try {
                      await API.post("/investments/subscribe", {
                        planId: plan.id,
                        amount: plan.minAmount,
                      });
                      toast.success("Investment started ✅");
                    } catch (err) {
                      toast.error(
                        err.response?.data?.error || "Investment failed ❌"
                      );
                    }
                  }}
                  className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold hover:opacity-90 transition"
                >
                  Invest ${plan.minAmount}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
