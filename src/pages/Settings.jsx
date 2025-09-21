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
      toast.error("Failed to load wallet");
    }
  }

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/change-password", passwords);
      toast.success("Password changed successfully");
      setPasswords({ current: "", new: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Password change failed");
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Profile */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-600" /> Profile
        </h2>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Wallet ID:</b> {wallet?.id}</p>
        <p><b>Balance:</b> ${wallet?.balance?.toFixed(2) ?? "0.00"}</p>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield size={20} className="text-green-600" /> Security
        </h2>
        <form onSubmit={changePassword} className="space-y-3">
          <input
            type="password"
            placeholder="Current password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            className="w-full p-3 rounded border"
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={passwords.new}
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            className="w-full p-3 rounded border"
            required
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Change Password
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
  }
