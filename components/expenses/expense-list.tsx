"use client";

import { AnimatePresence } from "motion/react";
import { ExpenseCard } from "./expense-card";
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
            className="h-16 rounded-[var(--radius-button)] bg-bg-tertiary/50 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4 animate-float">🐣</div>
        <p className="text-sm font-bold text-text-primary font-display mb-1">
          No expenses yet!
        </p>
        <p className="text-xs text-text-secondary">
          Tap the + button to add your first expense ~
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
    <div className="flex flex-col gap-5">
      {Object.entries(grouped).map(([date, dateExpenses]) => (
        <div key={date}>
          <p className="text-xs font-semibold text-text-secondary mb-2 px-1 font-display">
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
