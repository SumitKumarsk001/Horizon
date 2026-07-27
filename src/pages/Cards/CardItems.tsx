import { FiWifi } from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";
import type { Card } from "../../features/cards/cardSlice";

interface CardItemProps {
  card: Card;
  userName: string;
}

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

const CardItem = ({ card, userName }: CardItemProps) => {

  // Uncomment only for testing Error Boundary
  // throw new Error("Testing Card Error Boundary");

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg h-full`}
    >
      {/* Decorative Circles */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-white/10" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <FiWifi size={24} className="rotate-90" />
      </div>

      {/* Balance */}
      <div className="relative mt-8">
        <p className="text-sm text-white/80">Available Balance</p>

        <h2 className="mt-2 text-3xl font-bold">
          {card.balance}
        </h2>
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
          <p className="text-xs uppercase text-white/70">
            Card Holder
          </p>

          <h3 className="mt-1 font-semibold">
            {card.holder || userName}
          </h3>
        </div>

        <div>
          <p className="text-xs uppercase text-white/70">
            Expiry
          </p>

          <h3 className="mt-1 font-semibold">
            {card.expiry}
          </h3>
        </div>

        <FaCcMastercard size={42} />
      </div>
    </div>
  );
};

export default CardItem;