// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Layers, BarChart, Wallet, Settings } from "lucide-react";

export default function Navbar() {
  const links = [
    { to: "/dashboard", icon: <Home size={22} />, label: "Home" },
    { to: "/plans", icon: <Layers size={22} />, label: "Plans" },
    { to: "/investments", icon: <BarChart size={22} />, label: "Invest" },
    { to: "/wallet", icon: <Wallet size={22} />, label: "Wallet" },
    { to: "/settings", icon: <Settings size={22} />, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-2 z-50">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600"
        >
          {link.icon}
          <span className="text-xs mt-1">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
