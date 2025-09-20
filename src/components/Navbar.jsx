import { NavLink } from "react-router-dom";
import { Home, Layers, BarChart, Wallet, Settings } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Home", icon: <Home size={22} /> },
  { to: "/plans", label: "Plans", icon: <Layers size={22} /> },
  { to: "/investments", label: "Invest", icon: <BarChart size={22} /> },
  { to: "/wallet", label: "Wallet", icon: <Wallet size={22} /> },
  { to: "/settings", label: "Settings", icon: <Settings size={22} /> },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2 shadow-md">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-blue-600" : "text-gray-500"
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
