// src/pages/Wallet.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");

  // Load wallet balance
  const fetchWallet = async () => {
    try {
      const res = await API.get("/wallet");
      setWallet(res.data);
    } catch (err) {
      toast.error("Failed to load wallet ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  // Deposit
  const handleDeposit = async () => {
    if (!amount || isNaN(amount)) return toast.error("Enter a valid amount");
    try {
      await API.post("/transactions/deposit", { amount: parseFloat(amount) });
      toast.success("Deposit successful ✅");
      setAmount("");
      fetchWallet(); // refresh balance
    } catch (err) {
      toast.error(err.response?.data?.error || "Deposit failed ❌");
    }
  };

  // Withdraw
  const handleWithdraw = async () => {
    if (!amount || isNaN(amount)) return toast.error("Enter a valid amount");
    try {
      await API.post("/transactions/withdraw", { amount: parseFloat(amount) });
      toast.success("Withdrawal successful ✅");
      setAmount("");
      fetchWallet(); // refresh balance
    } catch (err) {
      toast.error(err.response?.data?.error || "Withdrawal failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gray-800 text-indigo-400 p-6 text-center shadow-md">
        <h1 className="text-2xl font-bold">crypto.base</h1>
        <p className="text-sm text-gray-400">Your wallet overview</p>
      </header>

      {/* Wallet */}
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Wallet
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading wallet...</p>
        ) : wallet ? (
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 text-center">
            <p className="text-lg text-gray-400">Current Balance</p>
            <p className="text-4xl font-bold text-green-400 mt-2">
              ${wallet.balance.toFixed(2)}
            </p>

            {/* Input for deposit/withdraw */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-6 w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={handleDeposit}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
              >
                Deposit
              </button>
              <button
                onClick={handleWithdraw}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
              >
                Withdraw
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No wallet found.</p>
        )}
      </div>
    </div>
  );
}
