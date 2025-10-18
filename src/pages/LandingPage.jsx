import { Link } from "react-router-dom";
import { Shield, Clock, TrendingUp, Star } from "lucide-react";
import { useEffect, useState } from "react";
import DepositAlert from "../components/DepositAlert";

const plans = [
  { name: "Basic", minAmount: 100, roi: 20, duration: 7 },
  { name: "Starter", minAmount: 300, roi: 25, duration: 7 },
  { name: "Master", minAmount: 500, roi: 30, duration: 14 },
  { name: "Elite", minAmount: 1000, roi: 40, duration: 14 },
];

const testimonials = [
  {
    name: "Colin Firth",
    role: "Actor",
    feedback:
      "This investment site is top-notch! The returns are solid, and support is excellent. 5/5 stars from me.",
  },
  {
    name: "David Smith",
    role: "Engineer",
    feedback:
      "The ROI is exactly as promised. Withdrawals are quick and hassle-free. Highly recommend EquiGrow!",
  },
  {
    name: "Emily Carter",
    role: "Freelancer",
    feedback:
      "I love the flexible investment plans – there’s something for every budget. Great support team too!",
  },
];

function Counter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const step = Math.max(Math.floor(duration / end), 10);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [target, duration]);
  return (
    <span className="text-3xl md:text-4xl font-bold text-indigo-600">
      {count}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  // 🔹 Show DepositAlert every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      DepositAlert(); // triggers randomized alert
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <header className="w-full py-4 px-5 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          {/* Purple “H” logo */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse shadow-md">
            <span className="text-white text-2xl font-bold select-none">H</span>
          </div>
          <h1 className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            EquiGrow
          </h1>
        </div>

        <nav className="flex gap-2 sm:gap-3 text-gray-700 font-medium">
          <Link
            to="/login"
            className="px-4 py-2 text-sm sm:text-base rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm sm:text-base rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
          >
            Signup
          </Link>
          <a
            href="#contact"
            className="px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-16 bg-gradient-to-r from-indigo-50 to-white">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Smarter Investments, Brighter Future
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
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
                className="px-6 py-3 rounded-lg border border-indigo-500 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition text-center"
              >
                Already a Member?
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/financial-growth-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--money-dollar-investment-profit-business-pack-economy-illustrations-4603726.png"
              alt="Investment growth"
              className="max-w-[260px] sm:max-w-sm md:max-w-md drop-shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <Counter target={500} suffix="+" />
            <p className="mt-2 text-gray-600">Active Investors</p>
          </div>
          <div>
            <Counter target={100} suffix="k+" />
            <p className="mt-2 text-gray-600">Total Payouts ($)</p>
          </div>
          <div>
            <Counter target={6} />
            <p className="mt-2 text-gray-600">Plans Available</p>
          </div>
          <div>
            <Counter target={98} suffix="%" />
            <p className="mt-2 text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            icon={Shield}
            title="Secure"
            text="Top security practices protect your funds and data."
          />
          <Feature
            icon={Clock}
            title="Fast Payouts"
            text="Quick withdrawals and transparent processing times."
          />
          <Feature
            icon={TrendingUp}
            title="High ROI"
            text="Plans designed for sustainable growth and returns."
          />
        </div>
      </section>

      {/* Plans */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Our Investment Plans
          </h2>
          <p className="text-gray-600 mb-10">
            Flexible plans tailored to your financial goals.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  Min Deposit:{" "}
                  <span className="font-semibold">${plan.minAmount}</span>
                </p>
                <p className="text-gray-600 mb-2">ROI: {plan.roi}%</p>
                <p className="text-gray-600 mb-6">
                  Duration: {plan.duration} days
                </p>
                <Link
                  to="/signup"
                  className="block w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
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
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            What Our Investors Say
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-indigo-50 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="mb-3 flex justify-center text-yellow-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">“{t.feedback}”</p>
                <h4 className="font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-indigo-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
          {formSubmitted ? (
            <p className="text-green-600 font-semibold">
              ✅ Thank you! We’ll get back to you soon.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="space-y-4 bg-white p-6 rounded-xl shadow"
            >
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              ></textarea>
              <button
                type="submit"
                className="px-6 py-3 w-full rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} EquiGrow. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="p-6 bg-indigo-50 rounded-xl shadow-sm hover:shadow-md transition">
      <Icon className="h-8 w-8 text-indigo-600 mb-3" />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
