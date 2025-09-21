import React, { useState, useEffect } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const res = await API.get("/wallet");
      setBalance(res.data.balance);
    } catch {
      toast.error("Failed to fetch wallet balance");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      toast.error("Insufficient balance");
      return;
    }
    setLoading(true);
    try {
      await API.post("/transactions/withdraw", {
        amount: parseFloat(amount),
        method,
        walletAddress: address,
      });
      toast.success("Withdrawal request submitted (pending)");
      setAmount("");
      setAddress("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Withdraw Funds</h2>
      <p className="text-sm text-slate-500 mb-3">Available Balance: ${balance.toFixed(2)}</p>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-3 rounded-lg border bg-slate-50"
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-3 rounded-lg border bg-slate-50"
        >
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="USDT">USDT (ERC20)</option>
        </select>
        <input
          placeholder="Destination wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full p-3 rounded-lg border bg-slate-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-red-400 to-yellow-400 text-black font-semibold hover:opacity-90 transition"
        >
          {loading ? "Submitting..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
  }
