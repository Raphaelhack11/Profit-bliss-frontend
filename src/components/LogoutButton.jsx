// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // if you're using shadcn/ui
import toast from "react-hot-toast";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("pb_token"); // ✅ clear auth token
    toast.success("Logged out successfully");
    navigate("/login"); // ✅ redirect to login
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2"
    >
      Logout
    </Button>
  );
}
