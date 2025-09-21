import React, { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";

const addresses = {
  Bitcoin: "bc1q4c6f7xzsekkpvd2guwkaww4m7se9yjlrxnrjc7",
  Ethereum: "0x08cFE6DDC3b58B0655dD1c9214BcfdDBD3855CCA",
  USDT_ERC20: "0x08cFE6DDC3b58B0655dD1c9214BcfdDBD3855CCA",
};

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }
    try {
      setLoading(true);
      await API.post("/transactions/deposit", {
        amount: parseFloat(amount),
        method,
      });
      setShowModal(true); // show modal instructions
    } catch (err) {
      toast.error(err.response?.data?.error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Deposit Funds</h2>
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
        <button
          className="w-full p-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Proceed"}
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              Payment Instructions
            </h3>
            <p className="text-slate-600 mb-4">
              Please pay <span className="font-bold">${amount}</span> in{" "}
              <span className="font-bold">{method}</span> to the wallet address below.
            </p>
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
              <span className="text-sm font-mono break-all text-slate-800">
                {addresses[method]}
              </span>
              <CopyButton text={addresses[method]} />
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/history");
              }}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold"
            >
              I’ve Sent
            </button>
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
      type="button"
      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      <Copy size={16} />
    </button>
  );
        }
