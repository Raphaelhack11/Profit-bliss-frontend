import React, { useState, useEffect } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const validateAmount = (val) => {
    if (val < 200) return "Minimum withdrawal is $200";
    if (val > balance) return "Insufficient balance";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    const validation = validateAmount(amt);
    if (validation) return setError(validation);

    setError("");
    setLoading(true);
    try {
      await API.post("/transactions/withdraw", {
        amount: amt,
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
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-900 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-6">
          Withdraw Funds
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Available Balance:{" "}
          <span className="font-semibold text-green-600">
            ${balance.toFixed(2)}
          </span>
        </p>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Amount (USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
          >
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="USDT">USDT (ERC20)</option>
          </select>

          <input
            placeholder="Wallet address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Submitting..." : "Withdraw"}
          </button>
        </form>
      </div>
    </div>
  );
                                    }
