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

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/transactions/deposit" , { amount: parseFloat(amount), method });
      // If your backend returns paymentInfo with address, show copyable field.
      toast.success("Deposit request created. Use the address shown to send funds.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-800 p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">Deposit Funds</h2>
      <form onSubmit={submit} className="space-y-4">
        <input required type="number" step="0.01" placeholder="Amount (USD)" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full p-3 rounded bg-slate-700" />
        <select value={method} onChange={e=>setMethod(e.target.value)} className="w-full p-3 rounded bg-slate-700">
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="USDT">USDT (ERC20)</option>
        </select>

        <div className="bg-slate-900 p-3 rounded">
          <div className="text-sm text-slate-300">Send {method} to:</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="font-mono break-all">{addresses[method]}</div>
            <CopyButton text={addresses[method]} />
          </div>
        </div>

        <button className="w-full p-3 rounded bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold" disabled={loading}>
          {loading ? "Submitting..." : "Create Deposit Request"}
        </button>
      </form>
    </div>
  );
}

function CopyButton({ text }) {
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Address copied");
  };
  return <button onClick={copy} className="px-3 py-1 bg-white/10 rounded">Copy</button>;
}
