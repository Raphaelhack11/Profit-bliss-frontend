import React from "react";
import { Link } from "react-router-dom";

export default function VerifyNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email address.
          Please check your inbox (and spam folder) to verify your account
          before logging in.
        </p>
        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
