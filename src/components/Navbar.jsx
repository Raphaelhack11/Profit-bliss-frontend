import { NavLink } from "react-router-dom";
import { Home, Layers, DollarSign, Wallet, Settings } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { to: "/dashboard", label: "Home", icon: <Home size={22} /> },
    { to: "/plans", label: "Plans", icon: <Layers size={22} /> },
    { to: "/deposit", label: "Deposit", icon: <DollarSign size={22} /> },
    { to: "/wallet", label: "Wallet", icon: <Wallet size={22} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-indigo-600 flex justify-around py-2 shadow-lg z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm transition ${
              isActive ? "text-white" : "text-indigo-200"
            }`
          }
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
