import React, { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = async () => {
    try {
      const res = await API.get("/admin/withdrawals");
      setWithdrawals(res.data);
    } catch (err) {
      toast.error("Failed to fetch withdrawals");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await API.post(`/admin/withdrawals/${id}/${action}`);
      toast.success(`Withdrawal ${action}ed ✅`);
      fetchWithdrawals(); // refresh
    } catch (err) {
      toast.error(err.response?.data?.error || `Failed to ${action} withdrawal`);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin - Withdrawals</h1>
      {withdrawals.length === 0 ? (
        <p>No withdrawals yet.</p>
      ) : (
        <ul className="space-y-3">
          {withdrawals.map((w) => (
            <li
              key={w.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">{w.user.name}</span> —{" "}
                  {w.amount} {w.currency}
                </p>
                <p className="text-sm text-gray-600">Status: {w.status}</p>
              </div>
              {w.status === "pending" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleAction(w.id, "approve")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(w.id, "reject")}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
          }
