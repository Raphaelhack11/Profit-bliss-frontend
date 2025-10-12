// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, DollarSign, Wallet, User } from "lucide-react";

export default function Navbar() {
  const links = [
    { to: "/dashboard", icon: <Home size={22} />, label: "Home" },
    { to: "/deposit", icon: <DollarSign size={22} />, label: "Deposit" },
    { to: "/wallet", icon: <Wallet size={22} />, label: "Wallet" },
    { to: "/settings", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around py-2 z-50">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium transition-colors ${
              isActive ? "text-indigo-600" : "text-gray-500"
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
