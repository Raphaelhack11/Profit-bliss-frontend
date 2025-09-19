import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavItem({ to, label }) {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link to={to} className={`flex-1 py-2 text-center ${active ? "text-yellow-300" : "text-slate-200"}`}>
      <div className="text-sm">{label}</div>
    </Link>
  );
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-pb-900 to-pb-800 text-white shadow-inner z-50">
      <div className="container mx-auto px-4 flex">
        <NavItem to="/dashboard" label="Home" />
        <NavItem to="/plans" label="Plans" />
        <NavItem to="/deposit" label="Deposit" />
        <NavItem to="/history" label="History" />
        <NavItem to="/settings" label="Settings" />
      </div>
    </nav>
  );
}
