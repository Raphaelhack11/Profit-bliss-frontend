import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) return toast.error("Please enter your verification code");

    setLoading(true);
    try {
      const res = await API.post("/auth/verify-otp", { email, code });
      toast.success(res.data.message || "Email verified successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/resend-otp", { email });
      toast.success(res.data.message || "Verification code resent!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to resend code ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <p>No email found. Please sign up again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Verify Your Email</h2>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder="Enter code"
            className="w-full border p-3 rounded-lg focus:ring focus:ring-indigo-300 outline-none text-center text-lg tracking-widest"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-500">
          Didn’t get the code?{" "}
          <button
            onClick={handleResend}
            disabled={loading}
            className="text-indigo-600 hover:underline font-medium disabled:opacity-50"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
    }
