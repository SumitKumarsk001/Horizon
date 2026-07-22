import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"

export interface Transaction {
  id: string | number;
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
  transactions: [],
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
  },

    setTransactions: (
  state,
  action: PayloadAction<Transaction[]>
   ) => {
  state.transactions = action.payload;
   },

    deleteTransaction: (
  state,
  action: PayloadAction<string>
  ) => {
  state.transactions = state.transactions.filter(
    (transaction) => transaction.id !== action.payload
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
  }
  },

   clearTransactions: (state) => {
  state.transactions = [];
  },
  },
});

export const {
  addTransaction,
  setTransactions,
  deleteTransaction,
  updateTransaction,
  clearTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;