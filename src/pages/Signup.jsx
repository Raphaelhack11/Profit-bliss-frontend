import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", password: "" });
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Account created. Please login.");
      nav("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create account — Profit Bliss</h2>
      <form onSubmit={handle} className="space-y-3">
        <input required className="w-full p-3 rounded bg-slate-700" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input required className="w-full p-3 rounded bg-slate-700" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input required className="w-full p-3 rounded bg-slate-700" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input required className="w-full p-3 rounded bg-slate-700" placeholder="Country" value={form.country} onChange={e=>setForm({...form, country:e.target.value})} />
        <input required className="w-full p-3 rounded bg-slate-700" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button className="w-full p-3 rounded bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
