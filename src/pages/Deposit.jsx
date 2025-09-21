import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { Copy, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const addresses = {
  Bitcoin: "bc1q4c6f7xzsekkpvd2guwkaww4m7se9yjlrxnrjc7",
  Ethereum: "0x08cFE6DDC3b58B0655dD1c9214BcfdDBD3855CCA",
  USDT: "0x08cFE6DDC3b58B0655dD1c9214BcfdDBD3855CCA",
};

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      await API.post("/transactions/deposit", {
        amount: parseFloat(amount),
        method,
      });
      setShowModal(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success("Address copied");
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Deposit Funds</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="number"
          step="0.01"
          placeholder="Amount (USD)"
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
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold hover:opacity-90 transition"
        >
          {loading ? "Submitting..." : "Proceed"}
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Complete Payment</h3>
            <p className="mb-3 text-slate-700">
              Please pay exactly <span className="font-bold">${amount}</span> in{" "}
              {method} to the wallet address below:
            </p>
            <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-between">
              <span className="font-mono text-sm break-all">{addresses[method]}</span>
              <button
                onClick={() => copy(addresses[method])}
                className="p-2 hover:bg-slate-200 rounded"
              >
                <Copy size={18} />
              </button>
            </div>
            <button
              onClick={() => navigate("/history")}
              className="mt-5 w-full p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:opacity-90 transition"
            >
              I’ve Sent Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
    }
