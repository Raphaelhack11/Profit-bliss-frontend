// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null); // 👀 debug state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      // ✅ Save token (make sure key matches interceptor in api.js)
      localStorage.setItem("pb_token", res.data.token);

      // ✅ Show raw response for debugging
      setServerResponse(res.data);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setServerResponse(err.response?.data || { error: err.message });
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Login
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* 👇 Debug output */}
      {serverResponse && (
        <pre className="mt-4 p-2 bg-gray-100 text-sm rounded w-full max-w-md overflow-x-auto">
          {JSON.stringify(serverResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}
