import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bitcoin, DollarSign } from "lucide-react";

const names = [
  "Emma", "James", "Sophia", "Daniel", "Olivia", "Liam", "Noah", "Ava",
  "Isabella", "Mason", "Lucas", "Mia", "Ethan", "Charlotte", "Benjamin",
  "Amelia", "Henry", "Harper", "Elijah", "Evelyn", "Michael", "Grace",
  "Jacob", "Ella", "Samuel", "Scarlett", "David", "Victoria"
];

const amounts = [100, 250, 500, 700, 1200, 3000, 5000, 7000, 9000, 15000, 20000, 25000];

const cryptos = [
  { name: "Bitcoin", icon: "₿", color: "text-yellow-400" },
  { name: "Ethereum", icon: "Ξ", color: "text-blue-400" },
  { name: "USDT", icon: "$", color: "text-green-400" },
];

const flags = ["🇺🇸", "🇬🇧", "🇨🇦", "🇩🇪", "🇫🇷", "🇳🇬", "🇰🇪", "🇿🇦", "🇮🇳", "🇦🇺", "🇧🇷", "🇸🇬"];

export default function DepositAlert() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const showAlert = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomCrypto = cryptos[Math.floor(Math.random() * cryptos.length)];
      const randomFlag = flags[Math.floor(Math.random() * flags.length)];

      setAlert({
        message: `${randomName} ${randomFlag} just deposited $${randomAmount} in ${randomCrypto.name}`,
        crypto: randomCrypto,
      });

      setTimeout(() => setAlert(null), 5000);
    };

    showAlert();
    const interval = setInterval(showAlert, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
      <AnimatePresence>
        {alert && (
          <motion.div
            key={alert.message}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md border border-indigo-200 text-gray-800 text-sm px-5 py-3 rounded-xl shadow-xl flex items-center gap-3"
          >
            <span
              className={`text-lg font-bold ${alert.crypto.color} drop-shadow-sm`}
            >
              {alert.crypto.icon}
            </span>
            <span className="font-medium">{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
