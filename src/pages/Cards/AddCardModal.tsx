import { useState } from "react";
import type { Card } from "../../features/cards/cardSlice";
import Input from "../../components/FormComponent/Input";
import Button from "../../components/FormComponent/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (card: Card) => void;
  // optional initial card to edit
  initialCard?: Card | null;
  // optional update callback (used when editing)
  onUpdate?: (card: Card) => void;
};

const gradients = [
  "from-blue-600 to-indigo-700",
  "from-purple-600 to-pink-600",
  "from-green-500 to-emerald-700",
  "from-orange-500 to-red-600",
];

const AddCardModal = ({ open, onClose, onAdd, initialCard, onUpdate }: Props) => {
  const [holder, setHolder] = useState(initialCard?.holder ?? "");
  const [number, setNumber] = useState(initialCard?.number ?? "");
  const [balance, setBalance] = useState(initialCard?.balance ?? "");
  const [expiry, setExpiry] = useState(initialCard?.expiry ?? "");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const card: Card = {
      id: initialCard ? initialCard.id : Date.now().toString(),
      holder,
      number,
      balance,
      expiry,
      color:
        gradients[Math.floor(Math.random() * gradients.length)],
    };

    if (onUpdate && initialCard) {
      onUpdate(card);
    } else {
      onAdd(card);
    }

    // reset only when not editing
    if (!initialCard) {
      setHolder("");
      setNumber("");
      setBalance("");
      setExpiry("");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-2xl font-bold">
          {initialCard ? "Edit Card" : "Add New Card"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Card Holder"
            name="holder"
            placeholder="Card Holder"
            value={holder}
            onChange={(e) => setHolder(e.target.value)}
            required
          />

          <Input
            label="Card Number"
            name="number"
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />

          <Input
            label="Balance"
            name="balance"
            placeholder="Balance"
            value={balance}
            onChange={(e) => {
              const raw = e.target.value;
              // allow numbers and dot, strip other chars, then prefix $
              const cleaned = raw.replace(/[^0-9.]/g, "");
              setBalance(cleaned ? `$${cleaned}` : "");
            }}
            required
          />

          <Input
            label="Expiry"
            name="expiry"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              {initialCard ? "Update Card" : "Add Card"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;