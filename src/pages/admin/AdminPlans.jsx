// src/pages/admin/AdminPlans.jsx
import React, { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    minAmount: "",
    roi: "",
    duration: "",
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await API.get("/admin/plans");
      setPlans(res.data);
    } catch (err) {
      toast.error("Failed to fetch plans ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        // Update plan
        await API.put(`/admin/plans/${editingPlan.id}`, form);
        toast.success("Plan updated ✅");
      } else {
        // Create new plan
        await API.post("/admin/plans", form);
        toast.success("Plan created ✅");
      }
      setForm({ name: "", description: "", minAmount: "", roi: "", duration: "" });
      setEditingPlan(null);
      loadPlans();
    } catch (err) {
      toast.error(err.response?.data?.error || "Action failed ❌");
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      description: plan.description || "",
      minAmount: plan.minAmount,
      roi: plan.roi,
      duration: plan.duration,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await API.delete(`/admin/plans/${id}`);
      toast.success("Plan deleted ❌");
      loadPlans();
    } catch (err) {
      toast.error("Failed to delete plan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Nav */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin - Manage Plans</h1>
        <div className="space-x-4">
          <Link to="/admin" className="text-gray-600 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link to="/admin/deposits" className="text-gray-600 hover:text-indigo-600">
            Deposits
          </Link>
          <Link to="/admin/withdrawals" className="text-gray-600 hover:text-indigo-600">
            Withdrawals
          </Link>
        </div>
      </nav>

      {/* ✅ Form */}
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          {editingPlan ? "Edit Plan" : "Add New Plan"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <input
            type="text"
            name="name"
            placeholder="Plan Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="number"
            name="minAmount"
            placeholder="Minimum Amount"
            value={form.minAmount}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="number"
            step="0.01"
            name="roi"
            placeholder="ROI (%)"
            value={form.roi}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (days)"
            value={form.duration}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {editingPlan ? "Update Plan" : "Create Plan"}
          </button>
          {editingPlan && (
            <button
              type="button"
              onClick={() => {
                setEditingPlan(null);
                setForm({ name: "", description: "", minAmount: "", roi: "", duration: "" });
              }}
              className="ml-2 px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* ✅ Plans Table */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Available Plans</h2>

        {loading ? (
          <p>Loading...</p>
        ) : plans.length === 0 ? (
          <p className="text-gray-500">No plans found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="p-3">Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Min Amount</th>
                  <th className="p-3">ROI (%)</th>
                  <th className="p-3">Duration (days)</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.description || "—"}</td>
                    <td className="p-3 font-semibold">${p.minAmount}</td>
                    <td className="p-3">{p.roi}%</td>
                    <td className="p-3">{p.duration} days</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
