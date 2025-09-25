import React, { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeposits = async () => {
    try {
      const res = await API.get("/admin/deposits");
      setDeposits(res.data);
    } catch (err) {
      toast.error("Failed to fetch deposits");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await API.post(`/admin/deposits/${id}/${action}`);
      toast.success(`Deposit ${action}ed ✅`);
      fetchDeposits(); // refresh
    } catch (err) {
      toast.error(err.response?.data?.error || `Failed to ${action} deposit`);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin - Deposits</h1>
      {deposits.length === 0 ? (
        <p>No deposits yet.</p>
      ) : (
        <ul className="space-y-3">
          {deposits.map((d) => (
            <li
              key={d.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">{d.user.name}</span> —{" "}
                  {d.amount} {d.currency}
                </p>
                <p className="text-sm text-gray-600">Status: {d.status}</p>
              </div>
              {d.status === "pending" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleAction(d.id, "approve")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(d.id, "reject")}
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
