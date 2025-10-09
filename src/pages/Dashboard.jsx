import React, { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    console.log("✅ Dashboard mounted!");
  }, []);

  const user = JSON.parse(localStorage.getItem("pb_user"));
  const token = localStorage.getItem("pb_token");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700">Dashboard</h1>
      <p className="mt-4 text-gray-600">If you can see this, routing works ✅</p>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <p><strong>User:</strong> {user?.name || "No user"}</p>
        <p><strong>Email:</strong> {user?.email || "No email"}</p>
        <p><strong>Role:</strong> {user?.role || "No role"}</p>
        <p><strong>Token present:</strong> {token ? "✅ Yes" : "❌ No"}</p>
      </div>
    </div>
  );
}
