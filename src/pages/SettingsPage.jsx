import React, { useState, useEffect } from "react";
import { LogOut, User, Shield } from "lucide-react";
import API from "../api";
import { useAuth } from "../authContext";
import toast from "react-hot-toast";

export default function Settings() {
  const { user, logout } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [passwords, setPasswords] = useState({ current: "", new: "" });

  useEffect(() => {
    fetchWallet();
  }, []);

  async function fetchWallet() {
    try {
      const res = await API.get("/wallet");
      setWallet(res.data);
    } catch (err) {
      toast.error("Failed to load wallet ❌");
    }
  }

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/change-password", passwords);
      toast.success("✅ Password changed successfully");
      setPasswords({ current: "", new: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Password change failed");
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-10 px-4">
      {/* Profile / Wallet */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User size={22} className="text-white" /> Profile
        </h2>
        <p className="mb-1"><b>Email:</b> {user?.email}</p>
        <p className="mb-1"><b>Wallet ID:</b> {wallet?.id}</p>
        <p><b>Balance:</b> ${wallet?.balance?.toFixed(2) ?? "0.00"}</p>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-700">
          <Shield size={22} className="text-green-600" /> Security
        </h2>
        <form onSubmit={changePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={passwords.new}
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
      }
