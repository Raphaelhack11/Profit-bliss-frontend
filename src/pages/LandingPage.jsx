import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-700">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-xl md:text-2xl font-bold">Profit Bliss</h1>
        <div className="space-x-2 md:space-x-4">
          <Link
            to="/login"
            className="px-3 py-2 md:px-4 md:py-2 rounded-md border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition text-sm md:text-base"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-2 md:px-4 md:py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition text-sm md:text-base"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Invest Smarter, Grow Faster
        </h2>
        <p className="mt-4 text-base md:text-lg text-blue-600 max-w-md md:max-w-xl">
          Secure and transparent investment plans designed to help you build
          wealth with confidence. Join us today and take the first step toward
          financial freedom.
        </p>
        <div className="mt-6 space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-md bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-md border border-blue-700 text-blue-700 font-medium hover:bg-blue-700 hover:text-white transition"
          >
            Already a Member?
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-blue-600 text-sm border-t">
        © {new Date().getFullYear()} Profit Bliss. All rights reserved.
      </footer>
    </div>
  );
}
