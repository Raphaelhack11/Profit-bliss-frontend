// src/pages/Plans.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    try {
      const res = await API.get("/plans");
      setPlans(res.data);
    } catch {
      toast.error("Failed to load plans ❌");
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Investment Plans
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Choose a plan that fits your budget and goals. Start investing today!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition bg-white"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-1">Minimum: ${plan.minAmount}</p>
              <p className="text-gray-600 mb-1">ROI: {plan.roi}%</p>
              <p className="text-gray-600 mb-4">
                Duration: {plan.duration} days
              </p>

              <button
                onClick={async () => {
                  try {
                    await API.post("/investments/subscribe", {
                      planId: plan._id,
                      amount: plan.minAmount,
                    });
                    toast.success("Investment started ✅");
                  } catch (err) {
                    toast.error(
                      err.response?.data?.error || "Investment failed ❌"
                    );
                  }
                }}
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Invest ${plan.minAmount}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                }
