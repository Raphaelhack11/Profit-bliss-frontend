import { Link } from "react-router-dom";
import { Shield, Clock, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-700">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-700">
          Profit Bliss
        </h1>
        <div className="space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-blue-700 text-blue-700 font-medium hover:bg-blue-700 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex-1 flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 bg-white">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />

        {/* Left Content */}
        <div className="flex-1 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-xl text-blue-700">
            Smarter Investments, Brighter Future
          </h2>
          <p className="mt-4 text-lg md:text-xl text-blue-600 max-w-lg">
            Grow your wealth with secure, transparent, and high-yield investment
            plans tailored just for you.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
            >
              Get Started
            </Link>
            <Link
              to="/plans"
              className="px-6 py-3 rounded-lg border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition"
            >
              View Plans
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 mt-10 md:mt-0 relative z-10 flex justify-center">
          <img
            src="https://undraw.co/api/illustrations/investment.svg"
            alt="Investment illustration"
            className="max-w-sm md:max-w-md"
          />
        </div>
      </main>

      {/* Feature Cards */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-6 relative z-10">
        <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition">
          <Shield className="h-10 w-10 text-blue-700 mb-4" />
          <h3 className="text-xl font-bold mb-2">Secure</h3>
          <p className="text-blue-600">
            Your investments are protected with top-notch security and safe
            infrastructure.
          </p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition">
          <Clock className="h-10 w-10 text-blue-700 mb-4" />
          <h3 className="text-xl font-bold mb-2">Fast Payouts</h3>
          <p className="text-blue-600">
            Withdraw your profits quickly and enjoy seamless transactions.
          </p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition">
          <TrendingUp className="h-10 w-10 text-blue-700 mb-4" />
          <h3 className="text-xl font-bold mb-2">High ROI</h3>
          <p className="text-blue-600">
            Take advantage of profitable investment plans designed for growth.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-blue-600 text-sm border-t mt-12 bg-white">
        © {new Date().getFullYear()} Profit Bliss. All rights reserved.
      </footer>
    </div>
  );
          }
