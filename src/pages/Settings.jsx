import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Settings() {
  const [wallet, setWallet] = useState(null);
  useEffect(() => {
    API.get("/wallet").then(r=>setWallet(r.data)).catch(()=>toast.error("Failed to load"));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings & Profile</h2>
      <div className="bg-slate-800 p-6 rounded">
        <div className="text-sm text-slate-400">Wallet ID</div>
        <div className="font-mono mt-2">{wallet?.id ?? "—"}</div>

        <div className="mt-6">
          <div className="text-sm text-slate-400">Balance</div>
          <div className="text-2xl font-bold">${wallet?.balance?.toFixed(2) ?? "0.00"}</div>
        </div>
      </div>
    </div>
  );
}
