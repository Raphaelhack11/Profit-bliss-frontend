import React from "react";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

export default function DebugApp() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Debug Mode</h1>
      <p>If this renders, your components are working.</p>
      <Dashboard />
      <Navbar />
    </div>
  );
}
