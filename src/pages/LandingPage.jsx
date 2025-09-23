// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { Shield, Clock, TrendingUp, Star } from "lucide-react";
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
      "Profit Bliss transformed my savings into steady growth. The process is transparent and super easy to follow!",
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
    <span className="counter text-3xl md:text-4xl font-bold text-indigo-600">
      {count}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* 🌐 Navbar */}
      <header className="w-full py-4 px-6 flex justify-between items-center border-b border-indigo-700">
        <h1 className="text-2xl font-extrabold text-indigo-400">CryptoBase</h1>
        <nav className="flex gap-4">
          <Link to="/login" className="hover:text-indigo-400 transition">
            Login
          </Link>
          <Link to="/signup" className="hover:text-indigo-400 transition">
            Signup
          </Link>
          <a href="#contact" className="hover:text-indigo-400 transition">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Smarter Investments, Brighter Future
            </h1>
            <p className="mt-4 text-lg text-indigo-300 max-w-xl mx-auto md:mx-0">
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

      {/* 🔢 Stats Section */}
      <section className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Counter target={500} suffix="+" />
            <p className="mt-2 text-indigo-300">Active Investors</p>
          </div>
          <div>
            <Counter target={100} suffix="k+" />
            <p className="mt-2 text-indigo-300">Total Payouts ($)</p>
          </div>
          <div>
            <Counter target={6} />
            <p className="mt-2 text-indigo-300">Plans Available</p>
          </div>
          <div>
            <Counter target={98} suffix="%" />
            <p className="mt-2 text-indigo-300">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-800 rounded-xl shadow card-hover">
            <Shield className="h-8 w-8 text-indigo-400 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Secure</h3>
            <p className="text-indigo-200">
              Top security practices protect your funds and data.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow card-hover">
            <Clock className="h-8 w-8 text-indigo-400 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Fast Payouts</h3>
            <p className="text-indigo-200">
              Quick withdrawals and transparent processing times.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow card-hover">
            <TrendingUp className="h-8 w-8 text-indigo-400 mb-3" />
            <h3 className="text-lg font-semibold mb-1">High ROI</h3>
            <p className="text-indigo-200">
              Plans designed for sustainable growth and returns.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-400">
            Our Investment Plans
          </h2>
          <p className="text-indigo-200 mb-10">
            Flexible plans tailored to your financial goals. Pick the one that
            suits you best.
          </p>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-8 no-scrollbar">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="min-w-[80%] sm:min-w-0 p-6 bg-gray-900 rounded-2xl shadow card-hover snap-center"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-indigo-300 mb-4">
                  Minimum Deposit:{" "}
                  <span className="font-semibold">${plan.minAmount}</span>
                </p>
                <p className="text-indigo-300 mb-2">ROI: {plan.roi}%</p>
                <p className="text-indigo-300 mb-6">
                  Duration: {plan.duration} days
                </p>
                <Link
                  to="/signup"
                  className="block w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Invest Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-400">
            What Our Investors Say
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-gray-800 rounded-xl shadow card-hover"
              >
                <div className="mb-3 flex justify-center text-yellow-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-indigo-200 italic mb-4">“{t.feedback}”</p>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm text-indigo-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📩 Contact Form */}
      <section id="contact" className="py-16 bg-gray-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">
            Contact Us
          </h2>
          <form className="space-y-4 bg-gray-900 p-6 rounded-xl shadow">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-indigo-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-indigo-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>
            <button
              type="button"
              className="px-6 py-3 w-full rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-indigo-400 text-sm border-t border-indigo-700">
        © {new Date().getFullYear()} CryptoBase. All rights reserved.
      </footer>
    </div>
  );
}
