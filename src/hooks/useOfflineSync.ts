import { useEffect } from "react";
import localforage from "localforage";
import {
  getOfflineTransactions,
  clearOfflineTransactions,
} from "../services/offlineStorage";
import { addTransactionApi } from "../services/transactionService";
import type { Transaction } from "../features/transactions/transactionSlice";

export const useOfflineSync = (email: string) => {

  useEffect(() => {

    const sync = async () => {
       console.log("Online event fired");
      if (!navigator.onLine) return;

      const queue : Transaction[]= await getOfflineTransactions();
      console.log("Queue:", queue);
      for (const item of queue) {
         console.log("Uploading:", item);
        await addTransactionApi(item, email);
      }

      await clearOfflineTransactions();
      console.log("Queue cleared");
    };

    window.addEventListener("online", sync);

    return () =>
      window.removeEventListener("online", sync);

  }, [email]);

};

export const cardsStorage = localforage.createInstance({
  name: "Horizon",
  storeName: "cards",
});

export const transactionsStorage = localforage.createInstance({
  name: "Horizon",
  storeName: "transactions",
});