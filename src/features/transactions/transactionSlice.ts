import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  status: "Income" | "Expense";
  date: string;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: JSON.parse(
    localStorage.getItem("transactions") || "[]"
  ),
};

const transactionSlice = createSlice({
  name: "transactions",

  initialState,

  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<Transaction>
    ) => {
      state.transactions.unshift(action.payload);

      localStorage.setItem(
        "transactions",
        JSON.stringify(state.transactions)
      );
    },

    deleteTransaction: (
      state,
      action: PayloadAction<string>
    ) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );

      localStorage.setItem(
        "transactions",
        JSON.stringify(state.transactions)
      );
    },

    updateTransaction: (
      state,
      action: PayloadAction<Transaction>
    ) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );

      if (index !== -1) {
        state.transactions[index] = action.payload;

        localStorage.setItem(
          "transactions",
          JSON.stringify(state.transactions)
        );
      }
    },

    clearTransactions: (state) => {
      state.transactions = [];

      localStorage.removeItem("transactions");
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  clearTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;