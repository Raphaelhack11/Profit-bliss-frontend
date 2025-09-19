import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/transactions/withdraw", { amount: parseFloat(amount), method, walletAddress: address });
      toast.success("Withdrawal request submitted (pending)");
    } catch (err) {
      toast.error(err.response?.data?.error || "Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-800 p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">Withdraw Funds</h2>
      <form onSubmit={submit} className="space-y-4">
        <input required type="number" step="0.01" placeholder="Amount (USD / crypto)" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full p-3 rounded bg-slate-700" />
        <select value={method} onChange={e=>setMethod(e.target.value)} className="w-full p-3 rounded bg-slate-700">
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="USDT">USDT (ERC20)</option>
        </select>
        <input required placeholder="Destination wallet address" value={address} onChange={e=>setAddress(e.target.value)} className="w-full p-3 rounded bg-slate-700" />
        <button className="w-full p-3 rounded bg-gradient-to-r from-red-400 to-yellow-400 text-black font-semibold" disabled={loading}>
          {loading ? "Submitting..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
}
