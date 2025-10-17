import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">
        Welcome to Profit Bliss
      </h1>
      <p className="text-gray-600 mb-6">
        Your trusted investment platform.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
