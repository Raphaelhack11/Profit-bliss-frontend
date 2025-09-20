// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { Shield, Clock, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-800">
      {/* Navbar area is provided by App's Navbar component; this page focuses on hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left: hero text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Smarter Investments, Brighter Future
            </h1>
            <p className="mt-4 text-lg text-blue-600 max-w-xl mx-auto md:mx-0">
              Grow your wealth with secure, transparent, high-yield investment plans tailored just for you.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link to="/signup" className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition text-center">
                Get Started
              </Link>
              <Link to="/login" className="px-6 py-3 rounded-lg border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition text-center">
                Already a Member?
              </Link>
            </div>
          </div>

          {/* Right: illustration (keeps inside max width) */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://undraw.co/api/illustrations/investment.svg"
              alt="Investment illustration"
              className="max-w-xs md:max-w-sm"
              onError={(e)=>{ e.currentTarget.style.display='none' }}
            />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="w-full bg-white pb-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border rounded-xl shadow">
            <Shield className="h-8 w-8 text-blue-700 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Secure</h3>
            <p className="text-blue-600">Top security practices protect your funds and data.</p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow">
            <Clock className="h-8 w-8 text-blue-700 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Fast Payouts</h3>
            <p className="text-blue-600">Quick withdrawals and transparent processing times.</p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow">
            <TrendingUp className="h-8 w-8 text-blue-700 mb-3" />
            <h3 className="text-lg font-semibold mb-1">High ROI</h3>
            <p className="text-blue-600">Plans designed for sustainable growth and returns.</p>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-blue-600 text-sm border-t">
        © {new Date().getFullYear()} Profit Bliss. All rights reserved.
      </footer>
    </div>
  );
                                                                                             }
