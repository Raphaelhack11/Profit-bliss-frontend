import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [wRes, pRes] = await Promise.all([API.get("/wallet"), API.get("/plans")]);
      setWallet(wRes.data);
      setPlans(pRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-slate-300">Wallet Balance</div>
              <div className="text-3xl font-bold counter">${wallet?.balance?.toFixed(2) ?? "0.00"}</div>
            </div>
            <div className="space-y-2">
              <Link to="/deposit" className="block px-4 py-2 bg-green-400 rounded text-black font-semibold">Deposit</Link>
              <Link to="/withdraw" className="block px-4 py-2 bg-white/10 rounded text-white">Withdraw</Link>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Quick Plans</h3>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {plans.slice(0, 6).map((p) => (
                <div key={p.id} className="bg-slate-800 p-3 rounded hover:scale-105 transform transition">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-slate-400">${p.minAmount} • {p.roi}%</div>
                  <div className="mt-3">
                    <Link to="/plans" className="text-xs text-yellow-300">View & Invest</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded">
          <h3 className="text-lg font-semibold">Activity</h3>
          <div className="mt-4 text-sm text-slate-300">
            Recent activity will appear here. Use the History page for full details.
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded">
        <h3 className="text-lg font-semibold">All Plans</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div key={p.id} className="p-4 rounded bg-gradient-to-r from-slate-800 to-slate-700">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg">{p.name}</div>
                  <div className="text-sm text-slate-400">${p.minAmount} • {p.duration} days</div>
                </div>
                <div className="text-2xl font-semibold">{p.roi}%</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to="/plans" className="px-3 py-2 bg-yellow-300 rounded text-black text-sm">View</Link>
                <button
                  onClick={async () => {
                    // quick invest for demo: check wallet and call /investments
                    try {
                      const amount = p.minAmount;
                      await API.post("/investments", { planId: p.id, amount });
                      toast.success("Investment started");
                    } catch (err) {
                      toast.error(err.response?.data?.error || "Investment failed");
                    }
                  }}
                  className="px-3 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-black rounded text-sm"
                >Invest ${p.minAmount}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
