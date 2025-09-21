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
    // fetch wallet balance
    API.get("/wallet")
      .then((res) => setBalance(res.data.balance || 0))
      .catch(() => setBalance(0));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("Enter valid amount");
    if (amt > balance) return toast.error("Insufficient balance");

    setLoading(true);
    try {
      await API.post("/transactions/withdraw", {
        amount: amt,
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
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Withdraw Funds</h2>
      <p className="text-sm text-slate-600 mb-4">
        Available Balance: <span className="font-semibold">${balance.toFixed(2)}</span>
      </p>
      <form onSubmit={submit} className="space-y-5">
        <input
          required
          type="number"
          step="0.01"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="USDT">USDT (ERC20)</option>
        </select>
        <input
          required
          placeholder="Destination wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full p-3 rounded-lg bg-gradient-to-r from-red-400 to-yellow-400 text-black font-bold hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
}
