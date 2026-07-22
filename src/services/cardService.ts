import api from "../api/axios";
import type { Card } from "../features/cards/cardSlice";

export const getCardsApi = (email: string) =>
  api.get("/cards", {
    headers: {
      "x-user-email": email,
    },
  });

export const addCardsApi = (
  card: Card,
  email: string
) =>
  api.post("/cards", card, {
    headers: {
      "x-user-email": email,
    },
  });