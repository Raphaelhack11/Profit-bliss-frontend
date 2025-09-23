// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { Shield, Clock, TrendingUp, Star, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const plans = [
  { name: "Basic", minAmount: 50, roi: 20, duration: 7 },
  { name: "Starter", minAmount: 100, roi: 25, duration: 7 },
  { name: "Master", minAmount: 200, roi: 30, duration: 14 },
  { name: "Elite", minAmount: 270, roi: 40, duration: 14 },
  { name: "Pro", minAmount: 350, roi: 50, duration: 21 },
  { name: "Premium", minAmount: 500, roi: 65, duration: 30 },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Entrepreneur",
    feedback:
      "Crypto.base transformed my savings into steady growth. The process is transparent and super easy to follow!",
  },
  {
    name: "David Smith",
    role: "Engineer",
    feedback:
      "The ROI is exactly as promised. Withdrawals are quick and hassle-free. Highly recommend this platform!",
  },
  {
    name: "Emily Carter",
    role: "Freelancer",
    feedback:
      "I love the investment plans – flexible and designed for all budgets. Great support team too!",
  },
];

// 🔢 Counter Component
function Counter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="counter text-3xl md:text-4xl font-bold text-indigo-500">
      {count}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-12">
        {/* glowing gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/30 via-purple-700/30 to-pink-600/30 blur-3xl animate-pulse"></div>

        <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Crypto.base – Smarter Investments, Brighter Future
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
              Grow your wealth with secure, transparent, high-yield investment
              plans tailored just for you.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition text-center"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg border border-indigo-500 text-indigo-400 font-semibold hover:bg-indigo-600 hover:text-white transition text-center"
              >
                Already a Member?
              </Link>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://undraw.co/api/illustrations/investment.svg"
              alt="Investment illustration"
              className="max-w-xs md:max-w-sm"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* ... keep stats, features, plans, testimonials ... */}

      {/* 📩 Contact Section */}
      <section className="bg-gray-800 py-16 animate-fadeInUp">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-center text-gray-300 mb-10">
            Have questions? Send us a message and our team will get back to you.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              <Mail className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} Crypto.base. All rights reserved.
      </footer>
    </div>
  );
      }
