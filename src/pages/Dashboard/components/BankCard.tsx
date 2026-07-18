import { FiWifi } from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";

type BankCardProps = {
  holderName: string;
  cardNumber: string;
  balance: string;
  expiry: string;
};

const BankCard = ({
  holderName,
  cardNumber,
  balance,
  expiry,
}: BankCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 p-6 text-white shadow-lg">

      {/* Background Circle */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-white/10" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-100">Primary Card</p>
          <h2 className="mt-1 text-xl font-bold">My Finance</h2>
        </div>

        <FiWifi size={24} className="rotate-90" />
      </div>

      {/* Balance */}
      <div className="relative mt-8">
        <p className="text-sm text-blue-100">Current Balance</p>
        <h1 className="mt-2 text-3xl font-bold">{balance}</h1>
      </div>

      {/* Card Number */}
      <div className="relative mt-8">
        <p className="tracking-[0.3em] text-lg font-semibold">
          {cardNumber}
        </p>
      </div>

      {/* Bottom */}
      <div className="relative mt-8 flex items-end justify-between">

        <div>
          <p className="text-xs uppercase text-blue-100">
            Card Holder
          </p>

          <p className="mt-1 font-semibold">
            {holderName}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-blue-100">
            Expiry
          </p>

          <p className="mt-1 font-semibold">
            {expiry}
          </p>
        </div>

        <FaCcMastercard
          size={42}
          className="text-white"
        />

      </div>
    </div>
  );
};

export default BankCard;