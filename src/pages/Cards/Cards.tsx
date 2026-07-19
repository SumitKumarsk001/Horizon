import {
  FiPlus,
  FiWifi,
} from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";
import {  useState } from "react";
import AddCardModal from "./AddCardModal";
import Button from "../../components/FormComponent/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addCard} from "../../features/cards/cardSlice";
import type { Card } from "../../features/cards/cardSlice";



const parseUserName = () => {
  if (typeof window === "undefined") return "";
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return "";

  try {
    const user = JSON.parse(storedUser) as {
      firstName?: string;
      lastName?: string;
    };
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  } catch {
    return "";
  }
};

const maskCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const visibleCount = 4;
  const maskedDigits = digits
    .split("")
    .map((digit, index) =>
      index >= digits.length - visibleCount ? digit : "*"
    );

  let digitIndex = 0;
  return value.replace(/\d/g, () => maskedDigits[digitIndex++] || "*");
};

const Cards = () => {
  const userName = parseUserName() || "Card Holder";
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards);


  const [open, setOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);


  const handleAddCard = (card: Card) => {
    dispatch(addCard(card));
  };

  // const handleUpdateCard = (card: Card) => {
  //    dispatch(updateCard(card));
  // setEditingCard(null);
  // };

  // const handleDeleteCard = (id: number) => {
  //    dispatch(deleteCard(id));
  // };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            My Cards
          </h1>

          <p className="text-slate-500">
            Manage your debit and credit cards.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          className="w-auto flex items-center gap-2 px-5 py-3"
          onClick={() => setOpen(true)}
        >
          <FiPlus />
          Add Card
        </Button>
      </div>

     

       <AddCardModal
       key={editingCard ? `edit-${editingCard.id}` : "add"}
       open={open}
       initialCard={editingCard}
       onClose={() => {
         setOpen(false);
         setEditingCard(null);
       }}
       onAdd={handleAddCard}
      //  onUpdate={handleUpdateCard}
       />

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 ">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg h-full`}
          >
            {/* Decorative Circles */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-white/10" />

            {/* Header */}
            <div className="relative flex items-center justify-between">
              <FiWifi size={24} className="rotate-90" />

              {/* <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-md "
                  onClick={() => {
                    setEditingCard(card);
                    setOpen(true);
                  }}
                >
                  <FiEdit size={10} />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-md"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <FiTrash2 size={10} />
                </Button>
              </div> */}
            </div>

            {/* Balance */}
            <div className="relative mt-8">
              <p className="text-sm text-white/80">Available Balance</p>

              <h2 className="mt-2 text-3xl font-bold">{card.balance}</h2>
            </div>

            {/* Card Number */}
            <div className="relative mt-8">
              <p className="tracking-[0.3em] text-lg font-semibold">
                {maskCardNumber(card.number)}
              </p>
            </div>

            {/* Footer */}
            <div className="relative mt-8 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase text-white/70">Card Holder</p>

                <h3 className="mt-1 font-semibold">{card.holder || userName}</h3>
              </div>

              <div>
                <p className="text-xs uppercase text-white/70">Expiry</p>

                <h3 className="mt-1 font-semibold">{card.expiry}</h3>
              </div>

              <FaCcMastercard size={42} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
          <h3 className="text-lg font-semibold dark:text-white">
            Total Cards
          </h3>

          <p className="mt-4 text-4xl font-bold text-blue-600">
            {cards.length}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
          <h3 className="text-lg font-semibold dark:text-white">
            Active Cards
          </h3>

          <p className="mt-4 text-4xl font-bold text-green-600">
            {cards.length}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
          <h3 className="text-lg font-semibold dark:text-white">
            Monthly Spending
          </h3>

          <p className="mt-4 text-4xl font-bold text-red-500">
            $2,480
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;