"use client";

import { AnimatePresence } from "motion/react";
import { ExpenseCard } from "./expense-card";
import { Receipt } from "lucide-react";
import type { Expense } from "@/lib/types";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, loading, onDelete }: ExpenseListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-[var(--radius-button)] bg-bg-tertiary animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-tertiary mb-4">
          <Receipt className="h-7 w-7 text-text-secondary/50" />
        </div>
        <p className="text-sm font-medium text-text-primary mb-1">
          No expenses yet
        </p>
        <p className="text-xs text-text-secondary">
          Tap the + button to add your first expense!
        </p>
      </div>
    );
  }

  // Group by date
  const grouped: Record<string, Expense[]> = {};
  for (const expense of expenses) {
    const key = expense.expense_date;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(expense);
  }

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(([date, dateExpenses]) => (
        <div key={date}>
          <p className="text-xs font-medium text-text-secondary mb-2 px-1">
            {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-col gap-1.5">
            <AnimatePresence mode="popLayout">
              {dateExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}
