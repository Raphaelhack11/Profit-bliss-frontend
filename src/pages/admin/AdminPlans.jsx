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
        await API.put(`/admin/plans/${editingPlan.id}`, form);
        toast.success("Plan updated ✅");
      } else {
        await API.post("/admin/plans", form);
        toast.success("Plan created ✅");
      }
      setForm({ name: "", description: "", minAmount: "", roi: "", duration: "" });
      setEditingPlan(null);
      loadPlans();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save plan ❌");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Nav */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin - Plans</h1>
        <div className="space-x-4">
          <Link to="/admin/dashboard" className="text-gray-600 hover:text-indigo-600">
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
      <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {editingPlan ? "Edit Plan" : "Add New Plan"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {editingPlan ? "Update Plan" : "Create Plan"}
          </button>
        </form>
      </div>

      {/* ✅ Plans List */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">All Plans</h2>
        {loading ? (
          <p>Loading...</p>
        ) : plans.length === 0 ? (
          <p className="text-gray-500">No plans found.</p>
        ) : (
          <div className="grid gap-4">
            {plans.map((plan) => (
              <div key={plan.id} className="p-4 bg-white shadow rounded-lg">
                <h3 className="font-bold text-indigo-700">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
                <p className="mt-1 text-gray-700">
                  Min: ${plan.minAmount} | ROI: {plan.roi}% | Duration:{" "}
                  {plan.duration} days
                </p>
                <button
                  onClick={() => handleEdit(plan)}
                  className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
        }
