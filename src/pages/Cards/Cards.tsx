import {
  FiPlus,
  FiWifi,
  FiMoreVertical,
} from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";

type Card = {
  id: number;
  holder: string;
  number: string;
  balance: string;
  expiry: string;
  color: string;
};

const cards: Omit<Card, "holder">[] = [
  {
    id: 1,
    number: "**** **** **** 1234",
    balance: "$12,540.00",
    expiry: "12/29",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: 2,
    number: "**** **** **** 5678",
    balance: "$4,250.00",
    expiry: "08/28",
    color: "from-emerald-500 to-green-700",
  },
  {
    id: 3,
    number: "**** **** **** 9876",
    balance: "$8,760.00",
    expiry: "03/30",
    color: "from-purple-600 to-pink-600",
  },
];

const parseUserName = () => {
  if (typeof window === "undefined") return "";
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return "";

  try {
    const user = JSON.parse(storedUser) as {
      firstName?: string;
      lastName?: string;
    };
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  } catch {
    return "";
  }
};

const Cards = () => {
  const userName = parseUserName() || "Card Holder";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            My Cards
          </h1>

          <p className="text-slate-500">
            Manage your debit and credit cards.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">
          <FiPlus />
          Add Card
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg`}
          >
            {/* Decorative Circles */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-white/10" />

            {/* Header */}
            <div className="relative flex items-center justify-between">
              <FiWifi size={24} className="rotate-90" />

              <button>
                <FiMoreVertical size={20} />
              </button>
            </div>

            {/* Balance */}
            <div className="relative mt-8">
              <p className="text-sm text-white/80">
                Available Balance
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.balance}
              </h2>
            </div>

            {/* Card Number */}
            <div className="relative mt-8">
              <p className="tracking-[0.3em] text-lg font-semibold">
                {card.number}
              </p>
            </div>

            {/* Footer */}
            <div className="relative mt-8 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase text-white/70">
                  Card Holder
                </p>

                <h3 className="mt-1 font-semibold">
                  {userName}
                </h3>
              </div>

              <div>
                <p className="text-xs uppercase text-white/70">
                  Expiry
                </p>

                <h3 className="mt-1 font-semibold">
                  {card.expiry}
                </h3>
              </div>

              <FaCcMastercard size={42} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
          <h3 className="text-lg font-semibold dark:text-white">
            Total Cards
          </h3>

          <p className="mt-4 text-4xl font-bold text-blue-600">
            {cards.length}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
          <h3 className="text-lg font-semibold dark:text-white">
            Active Cards
          </h3>

          <p className="mt-4 text-4xl font-bold text-green-600">
            3
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
          <h3 className="text-lg font-semibold dark:text-white">
            Monthly Spending
          </h3>

          <p className="mt-4 text-4xl font-bold text-red-500">
            $2,480
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;