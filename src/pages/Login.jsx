import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState(""); // Optional for testing
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDebug("");

    try {
      const res = await API.post("/auth/login", { email, password });
      setDebug(JSON.stringify(res.data, null, 2));

      if (res.data.token && res.data.user) {
        // ✅ Use AuthContext login method
        login(res.data.token);

        // Store extra info locally
        localStorage.setItem("pb_role", res.data.user.role);
        localStorage.setItem("pb_user", JSON.stringify(res.data.user));

        toast.success("Login successful ✅");

        // ✅ Navigate based on role
        setTimeout(() => {
          if (res.data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 500);
      } else {
        toast.error("Unexpected response — missing token or user data");
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed ❌";

      toast.error(message);
      setDebug(JSON.stringify(err.response?.data || err.message, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-50 to-white px-6">
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

        {debug && (
          <div className="mt-8 bg-gray-100 text-gray-800 text-sm p-3 rounded-lg overflow-x-auto">
            <strong>🔍 Backend Response:</strong>
            <pre>{debug}</pre>
          </div>
        )}
      </div>
    </div>
  );
            }
