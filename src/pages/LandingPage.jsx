import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Hero Section */}
      <header className="flex justify-between items-center px-8 py-6 shadow">
        <h1 className="text-2xl font-bold text-blue-600">Profit Bliss</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Invest Smarter, Grow Faster
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Secure and transparent investment plans designed to help you build
          wealth with confidence. Join us today and take the first step toward
          financial freedom.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-md border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Already a Member?
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Profit Bliss. All rights reserved.
      </footer>
    </div>
  );
          }
