import api from "../api/axios";
import type { Transaction } from "../features/transactions/transactionSlice";

export const getTransactionsApi = (email: string) =>
  api.get<Transaction[]>("/transactions", {
    headers: {
      "x-user-email": email,
    },
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