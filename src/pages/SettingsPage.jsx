import React, { useState } from "react";
import API from "../api";  
import toast from "react-hot-toast";
import { useAuth } from "../authContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  // profile
  const [name, setName] = useState(user?.name || "");

  // password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // finance
  const [wallet, setWallet] = useState(user?.wallet || "");
  const [currency, setCurrency] = useState(user?.currency || "USD");

  const handleProfileUpdate = async () => {
    if (!name) return toast.error("Name cannot be empty");
    setLoading(true);
    try {
      await API.put("/users/profile", { name });
      toast.success("Profile updated successfully ✅");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword)
      return toast.error("Please fill both password fields");
    setLoading(true);
    try {
      await API.put("/auth/change-password", { oldPassword, newPassword });
      toast.success("Password updated successfully ✅");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to change password ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleFinanceUpdate = async () => {
    setLoading(true);
    try {
      await API.put("/users/finance", { wallet, currency });
      toast.success("Finance settings updated ✅");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update ❌");
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ label, id }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        activeTab === id
          ? "bg-indigo-600 text-white shadow-md"
          : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pb-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Settings
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <TabButton label="Profile" id="profile" />
          <TabButton label="Security" id="security" />
          <TabButton label="Finance" id="finance" />
          <TabButton label="Preferences" id="preferences" />
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-fadeIn">
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring focus:ring-indigo-200 outline-none"
            />

            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full border rounded-xl p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
            />

            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-4 animate-fadeIn">
            <label className="block text-sm font-medium text-gray-600">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring focus:ring-indigo-200 outline-none"
            />

            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring focus:ring-indigo-200 outline-none"
            />

            <button
              onClick={handlePasswordChange}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        )}

        {/* Finance Tab */}
        {activeTab === "finance" && (
          <div className="space-y-4 animate-fadeIn">
            <label className="block text-sm font-medium text-gray-600">
              Wallet Address
            </label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring focus:ring-indigo-200 outline-none"
              placeholder="Enter wallet address"
            />

            <label className="block text-sm font-medium text-gray-600">
              Preferred Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring focus:ring-indigo-200 outline-none"
            >
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
              <option value="EUR">EUR</option>
            </select>

            <button
              onClick={handleFinanceUpdate}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Update Finance Info"}
            </button>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="space-y-6 animate-fadeIn text-center text-gray-600">
            <p>Coming soon: Theme, Notifications, and Language options 🌙✨</p>
          </div>
        )}

        {/* Logout */}
        <div className="pt-6 mt-6 border-t text-center">
          <button
            onClick={logout}
            className="text-red-500 font-semibold hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
