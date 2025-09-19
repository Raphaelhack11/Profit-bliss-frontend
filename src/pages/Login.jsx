import React, { useState } from "react";
import API from "../api";
import { useAuth } from "../authContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token || res.data?.token;
      if (!token) throw new Error("No token returned");
      login(token);
      toast.success("Welcome back!");
      nav("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login to Profit Bliss</h2>
      <form onSubmit={handle} className="space-y-4">
        <input className="w-full p-3 rounded bg-slate-700" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-3 rounded bg-slate-700" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full p-3 rounded bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="mt-4 text-sm">
        Don't have an account? <Link to="/signup" className="text-yellow-300">Sign up</Link>
      </div>
    </div>
  );
}
