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

  const submit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          Deposit Funds
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            required
            type="number"
            step="0.01"
            placeholder="Amount (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="USDT">USDT (ERC20)</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
          >
            Proceed
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl max-w-md w-full border border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold text-indigo-400 mb-4">
              Complete Deposit
            </h3>
            <p className="mb-3 text-gray-300">
              Please pay exactly <b>${amount}</b> using{" "}
              <span className="font-semibold">{method}</span> to:
            </p>

            <div className="bg-gray-900 p-3 rounded-lg font-mono text-gray-100 flex justify-between items-center">
              <span className="truncate">{addresses[method]}</span>
              <CopyButton text={addresses[method]} />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeposit}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "I have sent"}
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
    toast.success("Address copied");
  };
  return (
    <button
      onClick={copy}
      className="ml-2 px-2 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
    >
      Copy
    </button>
  );
                     }
