
import { useSearchParams } from "react-router-dom";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiPlus,
} from "react-icons/fi";
import AddTransactionModal from "./AddTransactionModal";
import { useState,useEffect, useRef } from "react";
import Button from "../../components/FormComponent/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addTransaction ,setTransactions} from "../../features/transactions/transactionSlice";
import type { Transaction } from "../../features/transactions/transactionSlice";
import {getTransactionsApi,addTransactionApi,} from "../../services/transactionService";
import WorkspaceCard from "../../components/Common/WorkspaceCard";
import Input from "../../components/FormComponent/Input";
import PageHeader from "../../components/Common/PageHeader";
import { toast } from "react-toastify";
import axios from "axios";
import { saveOfflineTransaction } from "../../services/offlineStorage";
import { useOfflineSync } from "../../hooks/useOfflineSync";

const Transactions = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const search = searchParams.get("search") || "";
 const filter =searchParams.get("filter") || "All";
 const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
 const userEmail = currentUser.email;

 useOfflineSync(userEmail);

 const dispatch = useAppDispatch();

const transactions = useAppSelector(
  (state) => state.transactions.transactions
);

 const [openModal, setOpenModal] = useState(false);
 const controllerRef = useRef<AbortController | null>(null);

 useEffect(() => {

  const fetchTransactions = async () => {

    try {

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();

      controllerRef.current = controller;

      const response = await getTransactionsApi(
        userEmail,
        search,
        filter,
        controller.signal
      );

      dispatch(setTransactions(response.data));

    } catch (error) {
  if (axios.isCancel(error)) {
    return; // Ignore cancelled requests
  }

    }

  };

  fetchTransactions();

}, [search, filter, userEmail, dispatch]);

  // const filteredTransactions = transactions.filter((item) => {
  //   const matchesSearch = item.title
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  //   const matchesFilter =
  //     filter === "All" ? true : item.status === filter;
  //   return matchesSearch && matchesFilter;
  // });

//  const handleAdd = async (transaction: Transaction) => {
//   try {
//     const response = await addTransactionApi(transaction,userEmail);

//     dispatch(addTransaction(response.data));

//     setOpenModal(false);
//     toast.success("Transaction Add Successfully");
//   } catch (error) {
//     console.error(error);
//   }
// };
const handleAdd = async (transaction: Transaction) => {

  if (!navigator.onLine) {

    await saveOfflineTransaction(transaction);

    dispatch(addTransaction(transaction));

    toast.success("Saved offline");

    setOpenModal(false);

    return;
  }

  try {

    const response = await addTransactionApi(
      transaction,
      userEmail
    );

    dispatch(addTransaction(response.data));

    toast.success("Transaction Added");

    setOpenModal(false);

  } catch (error) {

    console.error(error);

  }

};

  return (
    <div className="space-y-6">

      {/* Header */}
    <PageHeader
    title="My Transactions"
    subtitle="View all your income and expenses."
    action={
        <Button
            type="button"
            variant="primary"
            className="w-auto flex items-center gap-2 px-5 py-3"
            onClick={() => setOpenModal(true)}
        >
            <FiPlus />
            Add Transaction
        </Button>
    }
/>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow dark:bg-slate-800 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80 dark:text-white">

          <Input
            label=""
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) =>
               setSearchParams({
              search: e.target.value,
              filter,
              })
             }
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
      <WorkspaceCard className="overflow-x-auto">

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

            {transactions.map((item) => (
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

      </WorkspaceCard>

      <AddTransactionModal open={openModal} onClose={() => setOpenModal(false)} onAdd={handleAdd} />

    </div>
  );
};

export default Transactions;