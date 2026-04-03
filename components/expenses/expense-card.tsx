"use client";

import { Trash2 } from "lucide-react";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { motion } from "motion/react";

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  const cat = expense.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="group flex items-center gap-3 px-4 py-3 rounded-[var(--radius-button)] bg-bg-secondary border border-border/30 hover:border-border/60 transition-all"
    >
      {/* Category emoji */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shrink-0"
        style={{ backgroundColor: `${cat?.color}15` }}
      >
        {cat?.emoji || "📦"}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">
          {cat?.name || "Uncategorized"}
        </p>
        {expense.note && (
          <p className="text-xs text-text-secondary truncate">{expense.note}</p>
        )}
      </div>

      {/* Amount & date */}
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-text-primary">
          -{formatCurrency(Number(expense.amount))}
        </p>
        <p className="text-[10px] text-text-secondary">
          {new Date(expense.expense_date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(expense.id)}
        className="opacity-0 group-hover:opacity-100 flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all shrink-0"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
