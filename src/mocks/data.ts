import type { Card } from "../features/cards/cardSlice";
import type { Transaction } from "../features/transactions/transactionSlice";

export const users = [
  {
    id: 1,
    firstName: "Sumit",
    lastName: "Kumar",
    email: "sumit@gmail.com",
    password: "12345678",
  },
];

// if user already register so they see only own cards and transaction that his add own by .
// if new user register they see no cards found pls add cards and similar for transaction
// and their logic was writing in handlers.ts and services
export const cardsDB: Record<string, Card[]> = {
  "sumit@gmail.com": [
    {
      id: 1,
      holder: "Sumit Kumar",
      number: "1111 2222 3333 4444",
      balance: "$1200",
      expiry: "12/29",
      color: "from-blue-500 to-blue-700",
    },
  ],
};

export const transactionsDB: Record<string, Transaction[]> = {
  "sumit@gmail.com": [
    {
      id: 1,
      title: "Salary",
      amount: 5000,
      category: "Income",
      status: "Income",
      date: "2026-07-20",
    },
  ],
};