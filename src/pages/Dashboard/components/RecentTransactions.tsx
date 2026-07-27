import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiShoppingBag,
  FiCreditCard,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import type { Transaction } from "../../../features/transactions/transactionSlice";

const defaultTransactions: Transaction[] = [
  // {
  //   id: 1,
  //   title: "Salary",
  //   category: "Income",
  //   date: "15 Jul 2026",
  //   amount: 2500,
  //   status: "Income",
  // },
  // {
  //   id: 2,
  //   title: "Netflix",
  //   category: "Subscription",
  //   date: "14 Jul 2026",
  //   amount: -15,
  //   status: "Expense",
  // },
  // {
  //   id: 3,
  //   title: "Amazon",
  //   category: "Shopping",
  //   date: "13 Jul 2026",
  //   amount: -125,
  //   status: "Expense",
  // },
  // {
  //   id: 4,
  //   title: "Freelance",
  //   category: "Income",
  //   date: "12 Jul 2026",
  //   amount: 800,
  //   status: "Income",
  // },
  // {
  //   id: 5,
  //   title: "Electricity",
  //   category: "Bills",
  //   date: "11 Jul 2026",
  //   amount: -65,
  //   status: "Expense",
  // },
];

const getIcon = (category: string) => {
  switch (category) {
    case "Income":
      return <FiArrowDownLeft size={20} />;
    case "Shopping":
      return <FiShoppingBag size={20} />;
    case "Subscription":
      return <FiCreditCard size={20} />;
    default:
      return <FiArrowUpRight size={20} />;
  }
};

const RecentTransactions = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  const sortedTransactions = (
    transactions.length ? transactions : defaultTransactions
  )
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    });

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>

          <p className="text-sm text-slate-500">
            Your latest financial activity
          </p>
        </div>

        <Link
          to="/dashboard/transactions"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-white"
        >
          View All
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-slate-500">
              <th className="pb-3">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {sortedTransactions.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 dark:border-slate-700"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        item.status === "Income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {getIcon(item.category)}
                    </div>

                    <span className="font-medium dark:text-white">
                      {item.title}
                    </span>
                  </div>
                </td>

                <td className="text-slate-500">
                  {item.category}
                </td>

                <td className="text-slate-500">
                  {item.date}
                </td>

                <td
                  className={`text-right font-semibold ${
                    item.status === "Income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.status === "Income"
                    ? `+$${item.amount}`
                    : `-$${Math.abs(item.amount)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {sortedTransactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  item.status === "Income"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {getIcon(item.category)}
              </div>

              <div>
                <h4 className="font-semibold dark:text-white">
                  {item.title}
                </h4>

                <p className="text-sm text-slate-500">
                  {item.date}
                </p>
              </div>
            </div>

            <span
              className={`font-semibold ${
                item.status === "Income"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {item.status === "Income"
                ? `+$${item.amount}`
                : `-$${Math.abs(item.amount)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;