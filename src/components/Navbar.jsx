import { NavLink } from "react-router-dom";
import { Home, Layers, BarChart2, Wallet as WalletIcon, Settings } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Home", icon: <Home size={20} /> },
  { to: "/plans", label: "Plans", icon: <Layers size={20} /> },
  { to: "/investments", label: "Invest", icon: <BarChart2 size={20} /> },
  { to: "/wallet", label: "Wallet", icon: <WalletIcon size={20} /> },
  { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-indigo-600 flex justify-around py-2 shadow-lg z-40">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs gap-1 py-1 ${
              isActive ? "text-white" : "text-indigo-200"
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
            }
