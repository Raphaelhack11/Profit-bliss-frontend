import React from "react";
import { NavLink } from "react-router-dom";
import { Home, DollarSign, Clock, Settings } from "lucide-react";

export default function Navbar() {
  const links = [
    { to: "/dashboard", icon: <Home size={22} />, label: "Home" },
    { to: "/plans", icon: <DollarSign size={22} />, label: "Plans" },
    { to: "/history", icon: <Clock size={22} />, label: "History" },
    { to: "/settings", icon: <Settings size={22} />, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-2 z-50">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium ${
              isActive ? "text-indigo-600" : "text-gray-500"
            }`
          }
        >
          {link.icon}
          <span className="text-xs mt-1">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
