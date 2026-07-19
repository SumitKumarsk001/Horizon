import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Card {
  id: string;
  holder: string;
  number: string;
  balance: string;
  expiry: string;
  color: string;
};

interface CardState {
  cards: Card[];
}

const initialState: CardState = {
  cards: JSON.parse(localStorage.getItem("cards") || "[]"),
};

const cardSlice = createSlice({
  name: "cards",

  initialState,

  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);

      localStorage.setItem("cards", JSON.stringify(state.cards));
    },

    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card) => card.id !== action.payload
      );

      localStorage.setItem("cards", JSON.stringify(state.cards));
    },

    updateCard: (state, action: PayloadAction<Card>) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );

      if (index !== -1) {
        state.cards[index] = action.payload;

        localStorage.setItem("cards", JSON.stringify(state.cards));
      }
    },

    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;

      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
  },
});

export const {
  addCard,
  deleteCard,
  updateCard,
  setCards,
} = cardSlice.actions;

export default cardSlice.reducer;