import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-pb-800 to-pb-700 shadow-md z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg">PB</div>
          <Link to="/dashboard" className="text-white text-xl font-semibold">Profit Bliss</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => { logout(); nav("/login"); }}
                className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
              >Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white/10 px-3 py-1 rounded">Login</Link>
              <Link to="/signup" className="bg-white/20 px-3 py-1 rounded">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
