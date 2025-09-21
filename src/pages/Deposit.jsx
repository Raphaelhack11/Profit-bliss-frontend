import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

const addresses = {
  Bitcoin: "bc1q4c6f7xzsekkpvd2guwkaww4m7se9yjlrxnrjc7",
  Ethereum: "0x08cFE6DDC3b58B0655dD1c9214BcfdDBD3855CCA",
  USDT: "0x08cFE6DDC3b58B0655dD1c9214BcfdDBD3855CCA"
};

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }
    setShowModal(true);
  };

  const confirmDeposit = async () => {
    setLoading(true);
    try {
      await API.post("/transactions", { 
        type: "deposit",
        amount: parseFloat(amount),
        method 
      });
      toast.success("Deposit request created. Awaiting approval.");
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Deposit Funds</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          type="number"
          step="0.01"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded border"
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-3 rounded border"
        >
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="USDT">USDT (ERC20)</option>
        </select>
        <button
          type="submit"
          className="w-full p-3 rounded bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold"
        >
          Proceed
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Complete Deposit</h3>
            <p className="mb-2">
              Please pay exactly <b>${amount}</b> using {method} to:
            </p>
            <div className="bg-gray-100 p-3 rounded font-mono break-all flex justify-between items-center">
              {addresses[method]}
              <CopyButton text={addresses[method]} />
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeposit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
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
  return <button onClick={copy} className="ml-2 px-2 py-1 bg-gray-200 rounded">Copy</button>;
        }
