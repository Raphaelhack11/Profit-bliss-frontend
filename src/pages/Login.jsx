import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      console.log("✅ Login response:", res.data);

      const { token, user } = res.data;
      if (!token || !user) throw new Error("Invalid response from server");

      localStorage.setItem("pb_token", token);
      localStorage.setItem("pb_role", user.role);
      localStorage.setItem("pb_user", JSON.stringify(user));

      toast.success("Login successful ✅");

      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      }, 500);
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);

      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed ❌";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Log in to access your dashboard
        </p>

        <form onSubmit={submit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow transition ${
              loading
                ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
                           }
