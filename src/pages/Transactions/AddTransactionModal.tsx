import { useState } from "react";
import Input from "../../components/FormComponent/Input";
import Button from "../../components/FormComponent/Button";
import type { Transaction } from "../../features/transactions/transactionSlice";


type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (t: Transaction) => void;
};

const categories = ["Company", "Subscription", "Shopping", "Project", "Utilities", "Food", "Travel", "Other"];

const AddTransactionModal = ({ open, onClose, onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"Income" | "Expense">("Income");

  if (!open) return null;

  const formatDate = (value: string) => {
    const dateObj = new Date(value);
    if (isNaN(dateObj.getTime())) return value;

    return dateObj.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount.replace(/[^0-9.]/g, "") || "0");
    if (!title || !amt || !date) return;

    onAdd({
      id: crypto.randomUUID(),
      title,
      category,
      date: formatDate(date),
      amount: amt,
      status,
    });

    // reset
    setTitle("");
    setCategory(categories[0]);
    setAmount("");
    setDate("");
    setStatus("Income");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>

        <form onSubmit={submit} className="space-y-3">
          <Input label="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border px-3 py-2">
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <Input label="Amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />

          <Input label="Date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="type" checked={status === "Income"} onChange={() => setStatus("Income")} />
              Income
            </label>

            <label className="inline-flex items-center gap-2">
              <input type="radio" name="type" checked={status === "Expense"} onChange={() => setStatus("Expense")} />
              Expense
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Add Transaction</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
