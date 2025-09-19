import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => { API.get("/plans").then(r=>setPlans(r.data)).catch(()=>toast.error("Failed to load plans")); }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Investment Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.id} className="bg-slate-800 p-5 rounded shadow hover:scale-105 transition">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-bold">{p.name}</div>
                <div className="text-sm text-slate-400">${p.minAmount} • {p.duration} days</div>
              </div>
              <div className="text-3xl font-semibold">{p.roi}%</div>
            </div>
            <div className="mt-4 flex gap-2">
              <InvestButton plan={p} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestButton({ plan }) {
  const [loading, setLoading] = useState(false);
  const invest = async () => {
    setLoading(true);
    try {
      await API.post("/investments", { planId: plan.id, amount: plan.minAmount });
      toast.success("Investment started");
    } catch (err) {
      toast.error(err.response?.data?.error || "Investment failed");
    } finally {
      setLoading(false);
    }
  };
  return <button onClick={invest} className="px-3 py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-black" disabled={loading}>{loading ? "Processing..." : `Invest $${plan.minAmount}`}</button>;
}
