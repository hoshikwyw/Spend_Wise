"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { CategoryPicker } from "./category-picker";
import { useExpenses } from "@/hooks/use-expenses";
import { StickyNote, Sparkles } from "lucide-react";

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
    <Modal open={open} onClose={onClose} title="Add Expense ✨">
      <div className="flex flex-col gap-5">
        {/* Amount Input */}
        <div className="text-center py-3 rounded-2xl bg-bg-tertiary">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-bold text-text-secondary/60">MMK</span>
            <input
              ref={amountRef}
              type="number"
              inputMode="numeric"
              step="1"
              min="0"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-4xl font-bold text-text-primary bg-transparent outline-none text-center w-48 placeholder:text-text-secondary/20 font-display [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Category Picker */}
        <div className="overflow-hidden">
          <label className="text-xs font-semibold text-text-secondary mb-2 block font-display">
            Pick a category ~
          </label>
          <div className="mx--1">
            <CategoryPicker
              categories={categories}
              selected={categoryId}
              onSelect={setCategoryId}
            />
          </div>
        </div>

        {/* Date & Note */}
        <div className="flex gap-2">
          <DatePicker value={date} onChange={setDate} />
          <button
            onClick={() => setShowNote(!showNote)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all shrink-0 ${
              showNote
                ? "border-accent text-accent bg-accent/5 scale-[1.02]"
                : "border-border/50 text-text-secondary bg-bg-tertiary hover:border-accent/30"
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
            placeholder="What was this for? 📝"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border border-border/50 bg-bg-tertiary px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
          />
        )}

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid || saving}
          size="lg"
          className="w-full rounded-full shadow-lg shadow-accent/20 font-display"
        >
          <Sparkles className="h-4 w-4" />
          {saving ? "Adding..." : "Add Expense"}
        </Button>
      </div>
    </Modal>
  );
}
