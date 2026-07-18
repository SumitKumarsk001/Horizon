import { useMemo, useState } from "react";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiSearch,
} from "react-icons/fi";

type Transaction = {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
  status: "Income" | "Expense";
};

const transactions: Transaction[] = [
  {
    id: 1,
    title: "Salary",
    category: "Company",
    date: "15 Jul 2026",
    amount: 2500,
    status: "Income",
  },
  {
    id: 2,
    title: "Netflix",
    category: "Subscription",
    date: "14 Jul 2026",
    amount: 15,
    status: "Expense",
  },
  {
    id: 3,
    title: "Amazon",
    category: "Shopping",
    date: "13 Jul 2026",
    amount: 180,
    status: "Expense",
  },
  {
    id: 4,
    title: "Freelance",
    category: "Project",
    date: "12 Jul 2026",
    amount: 800,
    status: "Income",
  },
  {
    id: 5,
    title: "Electric Bill",
    category: "Utilities",
    date: "10 Jul 2026",
    amount: 70,
    status: "Expense",
  },
  {
    id: 6,
    title: "Bonus",
    category: "Company",
    date: "05 Jul 2026",
    amount: 500,
    status: "Income",
  },
];

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Transactions
        </h1>

        <p className="text-slate-500">
          View all your income and expenses.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow dark:bg-slate-800 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">

          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none dark:border-slate-600 dark:bg-slate-700"
          />

        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 outline-none dark:border-slate-600 dark:bg-slate-700"
        >
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow dark:bg-slate-800">

        <table className="min-w-full">

          <thead className="border-b">

            <tr className="text-left">

              <th className="px-6 py-4">Transaction</th>

              <th className="px-6 py-4">Category</th>

              <th className="px-6 py-4">Date</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-right">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredTransactions.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-none hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        item.status === "Income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status === "Income" ? (
                        <FiArrowDownLeft />
                      ) : (
                        <FiArrowUpRight />
                      )}
                    </div>

                    <span className="font-medium dark:text-white">
                      {item.title}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-4">
                  {item.category}
                </td>

                <td className="px-6 py-4">
                  {item.date}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      item.status === "Income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    item.status === "Income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.status === "Income"
                    ? `+$${item.amount}`
                    : `-$${item.amount}`}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Transactions;