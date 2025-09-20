import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Wallet, Clock, Settings } from "lucide-react";

export default function BottomNav() {
  const links = [
    { to: "/dashboard", label: "Home", icon: <Home size={20} /> },
    { to: "/plans", label: "Plans", icon: <Wallet size={20} /> },
    { to: "/history", label: "History", icon: <Clock size={20} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-slate-800 border-t border-slate-700 flex justify-around py-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-blue-400" : "text-gray-400"
            }`
          }
        >
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
