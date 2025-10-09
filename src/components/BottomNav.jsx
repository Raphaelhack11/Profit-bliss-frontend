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
    <nav className="fixed bottom-0 w-full bg-indigo-600 border-t border-indigo-700 flex justify-around py-2 shadow-lg">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm transition-all duration-200 ${
              isActive
                ? "text-white scale-110 drop-shadow-md"
                : "text-indigo-200 scale-100"
            }`
          }
        >
          {React.cloneElement(link.icon, {
            className: isActive ? "text-white" : "text-indigo-200",
            size: isActive ? 24 : 20, // active icon slightly bigger
          })}
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
              }
