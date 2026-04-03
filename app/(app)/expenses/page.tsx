"use client";

import { useState } from "react";
import { useExpenses } from "@/hooks/use-expenses";
import { ExpenseList } from "@/components/expenses/expense-list";
import { getMonthStart, getMonthName, formatCurrency } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function ExpensesPage() {
  const [monthOffset, setMonthOffset] = useState(0);

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const month = getMonthStart(targetDate);

  const { expenses, loading, totalSpent, deleteExpense } = useExpenses(month);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-display flex items-center gap-2">
            Expenses
            <span className="text-xl">📝</span>
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            {formatCurrency(totalSpent)} spent this month
          </p>
        </div>

        {/* Month navigator */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMonthOffset((o) => o - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-text-primary min-w-[8rem] text-center font-display">
            {getMonthName(month)}
          </span>
          <button
            onClick={() => setMonthOffset((o) => o + 1)}
            disabled={monthOffset >= 0}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ExpenseList expenses={expenses} loading={loading} onDelete={deleteExpense} />
    </motion.div>
  );
}
