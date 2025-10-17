import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import DepositAlert from "../components/DepositAlert"; // ✅ Import alert component

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await API.get("/plans");
        setPlans(res.data);
      } catch (err) {
        toast.error("Failed to load plans");
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 text-gray-900 px-6 py-10 relative">
      {/* 💸 Real-time deposit alert */}
      <DepositAlert />

      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">
          Investment Plans
        </h2>
        <p className="text-gray-600">
          Choose a plan that suits your financial goals and start earning today.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-indigo-100 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="text-gray-700 text-sm mb-6 space-y-2">
                <li>
                  <b>Min Deposit:</b> ${plan.minDeposit}
                </li>
                <li>
                  <b>ROI:</b> {plan.roi}%
                </li>
                <li>
                  <b>Duration:</b> {plan.duration} days
                </li>
              </ul>
              <button
                onClick={() => toast.success(`Selected ${plan.name} plan`)}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Invest Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No plans available yet.</p>
        )}
      </div>
    </div>
  );
              }
