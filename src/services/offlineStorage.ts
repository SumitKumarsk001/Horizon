


import localforage from "localforage";
import type { Transaction } from "../features/transactions/transactionSlice";
import type { Card } from "../features/cards/cardSlice";


// Offline Queue 

export const offlineDB = localforage.createInstance({
  name: "HorizonDB",
});

export const saveOfflineTransaction = async (
  transaction: Transaction
) => {
  const queue =
    (await offlineDB.getItem<Transaction[]>("transactionQueue")) || [];

  queue.push(transaction);

  await offlineDB.setItem("transactionQueue", queue);
};

export const getOfflineTransactions = async () => {
  return (
    (await offlineDB.getItem<Transaction[]>("transactionQueue")) || []
  );
};

export const clearOfflineTransactions = async () => {
  await offlineDB.removeItem("transactionQueue");
};


// IndexedDB Storage 

export const transactionsStorage = localforage.createInstance({
  name: "Horizon",
  storeName: "transactions",
});

export const cardsStorage = localforage.createInstance({
  name: "Horizon",
  storeName: "cards",
});

// Get Transactions
export const getStoredTransactions = async (
  email: string
): Promise<Transaction[]> => {
  return (
    (await transactionsStorage.getItem<Transaction[]>(email)) || []
  );
};

// Save Transactions
export const saveStoredTransactions = async (
  email: string,
  transactions: Transaction[]
) => {
  await transactionsStorage.setItem(email, transactions);
};

// Get Cards
export const getStoredCards = async (
  email: string
): Promise<Card[]> => {
  return (
    (await cardsStorage.getItem<Card[]>(email)) || []
  );
};

// Save Cards
export const saveStoredCards = async (
  email: string,
  cards: Card[]
) => {
  await cardsStorage.setItem(email, cards);
};