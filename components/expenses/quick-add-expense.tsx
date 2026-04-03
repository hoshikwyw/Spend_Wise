"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CategoryPicker } from "./category-picker";
import { useExpenses } from "@/hooks/use-expenses";
import { CalendarDays, StickyNote } from "lucide-react";

interface QuickAddExpenseProps {
  open: boolean;
  onClose: () => void;
}

export function QuickAddExpense({ open, onClose }: QuickAddExpenseProps) {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);

  const { categories, addExpense } = useExpenses();

  useEffect(() => {
    if (open) {
      setAmount("");
      setCategoryId(null);
      setNote("");
      setShowNote(false);
      setDate(new Date().toISOString().split("T")[0]);
      setTimeout(() => amountRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!amount || !categoryId) return;
    setSaving(true);
    await addExpense({
      amount: parseFloat(amount),
      category_id: categoryId,
      note: note || undefined,
      expense_date: date,
    });
    setSaving(false);
    onClose();
  };

  const isValid = amount && parseFloat(amount) > 0 && categoryId;

  return (
    <Modal open={open} onClose={onClose} title="Add Expense">
      <div className="flex flex-col gap-5">
        {/* Amount Input */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl font-bold text-text-secondary">MMK</span>
            <input
              ref={amountRef}
              type="number"
              inputMode="numeric"
              step="1"
              min="0"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-4xl font-bold text-text-primary bg-transparent outline-none text-center w-48 placeholder:text-text-secondary/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Category Picker */}
        <div>
          <label className="text-xs font-medium text-text-secondary mb-2 block">
            Category
          </label>
          <CategoryPicker
            categories={categories}
            selected={categoryId}
            onSelect={setCategoryId}
          />
        </div>

        {/* Date & Note toggles */}
        <div className="flex gap-2">
          <div className="flex items-center gap-2 flex-1">
            <CalendarDays className="h-4 w-4 text-text-secondary" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm text-text-primary bg-transparent outline-none border border-border rounded-[var(--radius-input)] px-2.5 py-1.5 flex-1"
            />
          </div>
          <button
            onClick={() => setShowNote(!showNote)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-input)] border text-sm transition-colors ${
              showNote
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-text-secondary hover:border-accent/50"
            }`}
          >
            <StickyNote className="h-3.5 w-3.5" />
            Note
          </button>
        </div>

        {/* Note Input */}
        {showNote && (
          <input
            type="text"
            placeholder="What was this for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-border bg-bg-tertiary px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          />
        )}

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid || saving}
          size="lg"
          className="w-full"
        >
          {saving ? "Adding..." : "Add Expense"}
        </Button>
      </div>
    </Modal>
  );
}
