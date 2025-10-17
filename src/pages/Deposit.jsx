// src/pages/Deposit.jsx
import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

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
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return setError("Enter a valid amount");
    if (amt < 100) return setError("Minimum deposit is $100");
    setError("");
    setShowModal(true);
  };

  const confirmDeposit = async () => {
    setLoading(true);
    try {
      await API.post("/transactions/deposit", {
        amount: parseFloat(amount),
        method,
      });
      toast.success("Deposit request created. Awaiting approval.");
      setShowModal(false);
      setAmount("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900 px-6 py-10">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Deposit Funds
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Choose a payment method and enter your amount to top up your account.
        </p>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (USD)
            </label>
            <input
              required
              type="number"
              step="0.01"
              placeholder="Enter amount (min $100)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900"
            >
              <option value="USDT">USDT (ERC20)</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition transform active:scale-95"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Minimum deposit: <span className="font-semibold text-indigo-600">$100</span>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl animate-fadeIn">
            <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
              Complete Your Deposit
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Send <b>${amount}</b> using{" "}
              <span className="font-semibold text-indigo-700">{method}</span> to the
              address below.
            </p>

            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 font-mono text-gray-900 flex justify-between items-center">
              <span className="truncate">{addresses[method]}</span>
              <CopyButton text={addresses[method]} />
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeposit}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "I’ve Sent the Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CopyButton({ text }) {
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard");
  };
  return (
    <button
      onClick={copy}
      className="ml-3 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition"
    >
      Copy
    </button>
  );
          }
