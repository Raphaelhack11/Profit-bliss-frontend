// src/pages/Withdraw.jsx
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
      toast.error("Failed to fetch wallet balance ❌");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      return toast.error("Insufficient balance ❌");
    }
    setLoading(true);
    try {
      await API.post("/transactions/withdraw", {
        amount: parseFloat(amount),
        method,
        walletAddress: address,
      });
      toast.success("Withdrawal request submitted ✅ (pending approval)");
      setAmount("");
      setAddress("");
      loadWallet();
    } catch (err) {
      toast.error(err.response?.data?.error || "Withdraw failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 space-y-5">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-700">Withdraw Funds</h2>
          <p className="text-sm text-gray-500 mt-1">
            Available Balance:{" "}
            <span className="font-semibold text-green-600">
              ${balance.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <input
            type="number"
            step="0.01"
            placeholder="Amount (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
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
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Submitting..." : "Withdraw"}
          </button>
        </form>
      </div>
    </div>
  );
}
