"use client";

import { useState } from "react";
import { useExpenses } from "@/hooks/use-expenses";
import { ExpenseList } from "@/components/expenses/expense-list";
import { getMonthStart, getMonthName, formatCurrency } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExpensesPage() {
  const [monthOffset, setMonthOffset] = useState(0);

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const month = getMonthStart(targetDate);

  const { expenses, loading, totalSpent, deleteExpense } = useExpenses(month);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary font-display">
            Expenses
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            {formatCurrency(totalSpent)} spent
          </p>
        </div>

        {/* Month navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMonthOffset((o) => o - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-text-primary min-w-[8rem] text-center">
            {getMonthName(month)}
          </span>
          <button
            onClick={() => setMonthOffset((o) => o + 1)}
            disabled={monthOffset >= 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ExpenseList expenses={expenses} loading={loading} onDelete={deleteExpense} />
    </div>
  );
}
