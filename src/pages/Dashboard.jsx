import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, Wallet, BarChart3 } from "lucide-react";
import API from "../api";
import { useAuth } from "../authContext";
import toast, { Toaster } from "react-hot-toast";
import DepositAlert from "../components/DepositAlert";

export default function Dashboard() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [plans, setPlans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, plansRes, txRes] = await Promise.all([
          API.get("/wallet"),
          API.get("/plans/active"),
          API.get("/transactions/history"),
        ]);
        setWallet(walletRes.data);
        setPlans(plansRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-gray-600 text-lg font-medium animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-6">
      <Toaster position="bottom-right" />
      <DepositAlert interval={15000} /> {/* ✅ same style & timing as Plans */}

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here’s your account summary and recent activity.
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <p className="text-3xl font-bold mt-2">
              ${wallet?.balance?.toFixed(2) || "0.00"}
            </p>
          </div>
          <Wallet size={40} className="opacity-80" />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "Deposit",
            icon: <ArrowDownCircle size={30} className="text-indigo-600 mb-2" />,
            path: "/deposit",
          },
          {
            label: "Withdraw",
            icon: <ArrowUpCircle size={30} className="text-green-600 mb-2" />,
            path: "/withdraw",
          },
          {
            label: "Plans",
            icon: <BarChart3 size={30} className="text-yellow-500 mb-2" />,
            path: "/plans",
          },
          {
            label: "History",
            icon: <BarChart3 size={30} className="text-blue-500 mb-2" />,
            path: "/history",
          },
        ].map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-gray-50 rounded-xl shadow-sm flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer"
            onClick={() => (window.location.href = item.path)}
          >
            {item.icon}
            <span className="font-medium text-gray-800">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Active Plans */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Active Investment Plans
        </h3>
        {plans.length === 0 ? (
          <p className="text-gray-500 text-sm">No active plans yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-gray-50 rounded-2xl shadow-sm"
              >
                <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Amount: ${plan.amount}
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${plan.progress || 0}%` }}
                    transition={{ duration: 0.8 }}
                    className="bg-indigo-500 h-2 rounded-full"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {plan.progress || 0}% completed
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Transactions */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Recent Transactions
        </h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-sm">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-50 rounded-2xl shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">Type</th>
                  <th className="py-3 px-4 text-left font-semibold">Amount</th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                  <th className="py-3 px-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-t border-gray-200">
                    <td className="py-3 px-4 capitalize">{tx.type}</td>
                    <td className="py-3 px-4">${tx.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          tx.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : tx.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
