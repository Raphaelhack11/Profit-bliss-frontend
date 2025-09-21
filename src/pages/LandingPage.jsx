// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { Shield, Clock, TrendingUp, Star } from "lucide-react";

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

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-800">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Smarter Investments, Brighter Future
            </h1>
            <p className="mt-4 text-lg text-blue-600 max-w-xl mx-auto md:mx-0">
              Grow your wealth with secure, transparent, high-yield investment
              plans tailored just for you.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition text-center"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition text-center"
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

      {/* Features */}
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition">
            <Shield className="h-8 w-8 text-blue-700 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Secure</h3>
            <p className="text-blue-600">
              Top security practices protect your funds and data.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition">
            <Clock className="h-8 w-8 text-blue-700 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Fast Payouts</h3>
            <p className="text-blue-600">
              Quick withdrawals and transparent processing times.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition">
            <TrendingUp className="h-8 w-8 text-blue-700 mb-3" />
            <h3 className="text-lg font-semibold mb-1">High ROI</h3>
            <p className="text-blue-600">
              Plans designed for sustainable growth and returns.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Investment Plans</h2>
          <p className="text-blue-700 mb-10">
            Flexible plans tailored to your financial goals. Pick the one that
            suits you best.
          </p>

          {/* Carousel (mobile) + Grid (desktop) */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-8 no-scrollbar">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="min-w-[80%] sm:min-w-0 p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition snap-center"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-blue-700 mb-4">
                  Minimum Deposit:{" "}
                  <span className="font-semibold">${plan.minAmount}</span>
                </p>
                <p className="text-blue-700 mb-2">ROI: {plan.roi}%</p>
                <p className="text-blue-700 mb-6">
                  Duration: {plan.duration} days
                </p>
                <Link
                  to="/signup"
                  className="block w-full py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition"
                >
                  Invest Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Investors Say</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition"
              >
                <Star className="h-6 w-6 text-yellow-400 mb-3 inline" />
                <Star className="h-6 w-6 text-yellow-400 mb-3 inline" />
                <Star className="h-6 w-6 text-yellow-400 mb-3 inline" />
                <Star className="h-6 w-6 text-yellow-400 mb-3 inline" />
                <Star className="h-6 w-6 text-yellow-400 mb-3 inline" />
                <p className="text-blue-700 italic mb-4">“{t.feedback}”</p>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm text-blue-600">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-blue-600 text-sm border-t">
        © {new Date().getFullYear()} Profit Bliss. All rights reserved.
      </footer>
    </div>
  );
}
