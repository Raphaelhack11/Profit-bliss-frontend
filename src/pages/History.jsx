import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function History() {
  const [investments, setInvestments] = useState([]);
  useEffect(() => {
    API.get("/investments/history").then(r => setInvestments(r.data)).catch(()=>toast.error("Failed to load history"));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Investment History</h2>
      <div className="space-y-3">
        {investments.map(inv => (
          <div key={inv.id} className="bg-slate-800 p-4 rounded flex justify-between">
            <div>
              <div className="font-semibold">{inv.plan?.name}</div>
              <div className="text-sm text-slate-400">${inv.amount} • {inv.status}</div>
            </div>
            <div className="text-sm">{new Date(inv.startDate).toLocaleDateString()}</div>
          </div>
        ))}
        {investments.length === 0 && <div className="text-slate-400">No investments yet.</div>}
      </div>
    </div>
  );
}
