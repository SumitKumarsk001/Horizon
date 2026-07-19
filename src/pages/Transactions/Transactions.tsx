
import { useSearchParams } from "react-router-dom";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiSearch,
  FiPlus,
} from "react-icons/fi";
import AddTransactionModal from "./AddTransactionModal";
import { useState } from "react";
import Button from "../../components/FormComponent/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addTransaction } from "../../features/transactions/transactionSlice";
import type { Transaction } from "../../features/transactions/transactionSlice";

// type Transaction = {
//   id: number;
//   title: string;
//   category: string;
//   date: string;
//   amount: number;
//   status: "Income" | "Expense";
// };


const Transactions = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const search = searchParams.get("search") || "";

 const filter =searchParams.get("filter") || "All";

 const dispatch = useAppDispatch();

const transactions = useAppSelector(
  (state) => state.transactions.transactions
);

 const [openModal, setOpenModal] = useState(false);

 

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" ? true : item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAdd = (transaction: Transaction) => {
    dispatch(addTransaction(transaction));
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex  items-start justify-between gap-4 md:flex-row md:items-center">
        <div><h1 className="text-3xl font-bold dark:text-white">
          Transactions
        </h1>
        <p className="text-slate-500">
          View all your income and expenses.
        </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="primary" className="w-auto" onClick={() => setOpenModal(true)}>
           <FiPlus /> Add Transaction
         </Button>
         </div>
         
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow dark:bg-slate-800 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">

          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) =>
               setSearchParams({
              search: e.target.value,
              })
             }
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />

        </div>

        <div className="flex items-center gap-3">
        <select
          value={filter}
         onChange={(e) =>
          setSearchParams({
          search,
          filter: e.target.value,
         })
         }
          className="rounded-lg border border-slate-300 px-4 py-2 outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        >
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        

         </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow dark:bg-slate-800">

        <table className="min-w-full">

          <thead className="border-b">

            <tr className="text-left dark:text-gray-400">

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

                <td className="px-6 py-4 dark:text-gray-500">
                  {item.category}
                </td>

                <td className="px-6 py-4 dark:text-gray-500">
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

      <AddTransactionModal open={openModal} onClose={() => setOpenModal(false)} onAdd={handleAdd} />

    </div>
  );
};

export default Transactions;