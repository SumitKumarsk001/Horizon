import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Card {
  id: string | number;
  holder: string;
  number: string;
  balance: string;
  expiry: string;
  color: string;
};

interface CardState {
  cards: Card[];
}
const getCurrentUserEmail = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.email || "";
  } catch {
    return "";
  }
};

const getStorageKey = () => {
  const email = getCurrentUserEmail();
  return `cards_${email}`;
};

const parseStoredCards = (): Card[] => {
  try {
    const raw = localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState: CardState = {
  cards: parseStoredCards(),
};

const cardSlice = createSlice({
  name: "cards",

  initialState,

  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);

     localStorage.setItem(
  getStorageKey(),
  JSON.stringify(state.cards)
);
    },

    deleteCard: (state, action: PayloadAction<string | number>) => {
      state.cards = state.cards.filter(
        (card) => String(card.id) !== String(action.payload)
      );

     localStorage.setItem(
  getStorageKey(),
  JSON.stringify(state.cards)
);
    },

    setCards: (
      state,
      action: PayloadAction<Card[] | { data: Card[] }>
    ) => {
      const payload = action.payload;

      if (Array.isArray(payload)) {
        state.cards = payload;
      } else if (payload && Array.isArray(payload.data)) {
        state.cards = payload.data;
      } else {
        state.cards = [];
      }

      localStorage.setItem(
  getStorageKey(),
  JSON.stringify(state.cards)
);
    },

    updateCard: (state, action: PayloadAction<Card>) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );

      if (index !== -1) {
        state.cards[index] = action.payload;

        localStorage.setItem(
  getStorageKey(),
  JSON.stringify(state.cards)
);
      }
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