import { Link } from "react-router-dom";
import { Shield, Clock, TrendingUp, Star } from "lucide-react";
import { useEffect, useState } from "react";

const fakeNames = [
  "John M.", "Sarah T.", "David R.", "Emma W.", "Michael B.", "Olivia K.",
  "Daniel L.", "Sophia C.", "James A.", "Isabella N.", "Ethan D.", "Liam F.",
  "Noah J.", "Mason G.", "Ava H.", "Lucas P.", "Charlotte Q.", "Amelia Z.",
  "Henry O.", "Elijah V.", "Emily D.", "Benjamin S.", "Chloe B.", "Logan C.",
  "Victoria F.", "Alexander W.", "Grace H.", "Jacob T.", "Madison P.",
  "Jackson K.", "Ella L.", "William N.", "Mila R.", "Owen E.", "Harper S.",
  "Caleb J.", "Abigail M.", "Levi Q.", "Lily G.", "Matthew A.", "Zoe W.",
  "Sebastian P.", "Aria C.", "Ryan D.", "Layla H.", "Carter V.", "Nora O.",
  "Dylan B.", "Hazel T.", "Eleanor K.", "Hudson F."
];
const fakeAmounts = [
  100, 150, 200, 250, 300, 350, 400, 450, 500, 550,
  600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100,
  1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800,
  4000, 4200, 4500, 4700, 5000, 5500, 6000, 6500, 7000,
  7500, 8000, 8500, 9000
];
const actions = ["deposited", "withdrew"];

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

// 💰 Floating alert component (bottom-middle-right)
function DepositAlert() {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({ name: "", amount: 0, action: "" });

  useEffect(() => {
    const showRandom = () => {
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const randomAmount = fakeAmounts[Math.floor(Math.random() * fakeAmounts.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setAlert({ name: randomName, amount: randomAmount, action: randomAction });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const interval = setInterval(showRandom, 15000);
    const initial = setTimeout(showRandom, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, []);

  return (
    <div
      className={`fixed right-2 sm:right-5 bottom-24 md:bottom-20 bg-white border border-gray-200 rounded-xl px-5 py-3 w-[270px] sm:w-[320px] text-gray-800 text-sm font-medium shadow-xl transition-all duration-500 ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-5 pointer-events-none"
      }`}
      style={{ zIndex: 9999 }}
    >
      💰{" "}
      <span className="font-semibold">{alert.name}</span>{" "}
      just {alert.action}{" "}
      <span
        className={`font-semibold ${
          alert.action === "deposited" ? "text-green-600" : "text-red-600"
        }`}
      >
        ${alert.amount.toLocaleString()}
      </span>
    </div>
  );
}

export default function LandingPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative">
      <DepositAlert />

      {/* Navbar */}
      <header className="w-full py-4 px-5 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029"
            alt="Bitcoin Logo"
            className="w-9 h-9 drop-shadow-md"
          />
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

      {/* Hero */}
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

      {/* Stats, Features, Plans, Testimonials, Contact (unchanged) */}
      {/* ... keep your existing sections here ... */}

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} EquiGrow. All rights reserved.
      </footer>
    </div>
  );
}
