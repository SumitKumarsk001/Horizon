import api from "../api/axios";
import type { Transaction } from "../features/transactions/transactionSlice";

export const getTransactionsApi = (
    email: string,
    search = "",
    filter = "All",
    signal?: AbortSignal) =>
  api.get<Transaction[]>("/transactions", {
    headers: {
      "x-user-email": email,
    },
     params: {
      search,
      filter,
    },
    signal,
  });

export const addTransactionApi = (
  transaction: Transaction,
  email: string
) =>
  api.post("/transactions", transaction, {
    headers: {
      "x-user-email": email,
    },
  });