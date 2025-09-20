import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
      {/* Header */}
      <header className="p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">Profit Bliss</h1>
        <p className="text-gray-600 mt-2">Grow your wealth with confidence 🚀</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Secure. Simple. Smart Investing.
        </h2>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-xl shadow hover:bg-blue-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Profit Bliss. All rights reserved.
      </footer>
    </div>
  );
}
