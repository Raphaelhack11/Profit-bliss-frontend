import React, { useEffect, useState } from "react";

const names = [
  "John M.", "Sarah T.", "David R.", "Emma W.", "Michael B.", "Olivia K.",
  "Daniel L.", "Sophia C.", "James A.", "Isabella N.", "Ethan D.", "Liam F.",
  "Noah J.", "Mason G.", "Ava H.", "Lucas P.", "Charlotte Q.", "Amelia Z.",
  "Henry O.", "Elijah V.", "Emily D.", "Benjamin S.", "Chloe B.", "Logan C.",
  "Victoria F.", "Alexander W.", "Grace H.", "Jacob T.", "Madison P.",
  "Jackson K.", "Ella L.", "William N.", "Mila R.", "Owen E.", "Harper S.",
  "Caleb J.", "Abigail M.", "Levi Q.", "Lily G.", "Matthew A.", "Zoe W.",
  "Sebastian P.", "Aria C.", "Ryan D.", "Layla H.", "Carter V.", "Nora O.",
  "Dylan B.", "Hazel T.", "Eleanor K.", "Hudson F."
];

const amounts = [
  100, 100, 200, 250, 326, 350, 400, 450, 500, 550,
  600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100,
  1200, 1358, 1400, 1500, 1610, 1700, 1800, 1900, 2000,
  2200, 2400, 2600, 2800, 3000, 3200, 3420, 3600, 3800,
  4000, 4200, 4500, 4700, 5000, 5500, 6000, 6500, 7000,
  7500, 8000, 8500, 730
];

export default function DepositAlert() {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({ name: "", amount: 0 });

  useEffect(() => {
    const showRandom = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      setAlert({ name: randomName, amount: randomAmount });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // first alert after 3s, then every 15s
    const interval = setInterval(showRandom, 15000);
    const initial = setTimeout(showRandom, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, []);

  return (
    <div
      className={`fixed right-4 md:right-8 bottom-24 md:bottom-20 bg-white shadow-xl border border-gray-200 rounded-xl px-5 py-3 w-[270px] sm:w-[320px] text-gray-800 text-sm font-medium transition-all duration-500 ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-5 pointer-events-none"
      }`}
      style={{ zIndex: 9999 }}
    >
      💰 <span className="font-semibold">{alert.name}</span> just deposited{" "}
      <span className="text-green-600 font-semibold">
        ${alert.amount.toLocaleString()}
      </span>
    </div>
  );
}
