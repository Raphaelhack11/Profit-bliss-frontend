import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Wallet, Settings, LogOut } from "lucide-react";
import { useAuth } from "../authContext";

const BottomNav = () => {
  const { logout } = useAuth();

  const links = [
    { to: "/dashboard", label: "Home", icon: <Home size={20} /> },
    { to: "/deposit", label: "Deposit", icon: <Wallet size={20} /> },
    { to: "/withdraw", label: "Withdraw", icon: <Wallet size={20} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex justify-around py-2 z-50">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}

      {/* Logout */}
      <button
        onClick={logout}
        className="flex flex-col items-center text-sm text-red-500"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default BottomNav;
