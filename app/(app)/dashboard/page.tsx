"use client";

import { useExpenses } from "@/hooks/use-expenses";
import { useBudget } from "@/hooks/use-budget";
import { getMonthStart } from "@/lib/utils";
import { MonthlySummaryCard } from "@/components/dashboard/monthly-summary-card";
import { SpendingPieChart } from "@/components/dashboard/spending-pie-chart";
import { SpendingTrendChart } from "@/components/dashboard/spending-trend-chart";
import { BudgetProgress } from "@/components/dashboard/budget-progress";
import { ExpenseCard } from "@/components/expenses/expense-card";
import { AnimatePresence } from "motion/react";

export default function DashboardPage() {
  const month = getMonthStart();
  const { expenses, totalSpent, spendingByCategory, loading, deleteExpense } =
    useExpenses(month);
  const { budget } = useBudget(month);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 rounded-[var(--radius-card)] bg-bg-tertiary animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-56 rounded-[var(--radius-card)] bg-bg-tertiary animate-pulse" />
          <div className="h-56 rounded-[var(--radius-card)] bg-bg-tertiary animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-text-primary font-display mb-6">
        Dashboard
      </h1>

      <div className="space-y-4">
        {/* Summary card */}
        <MonthlySummaryCard
          totalSpent={totalSpent}
          expenseCount={expenses.length}
        />

        {/* Charts row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SpendingPieChart
            data={spendingByCategory}
            totalSpent={totalSpent}
          />
          <BudgetProgress
            budget={budget?.amount ? Number(budget.amount) : null}
            spent={totalSpent}
          />
        </div>

        {/* Trend chart */}
        <SpendingTrendChart expenses={expenses} month={month} />

        {/* Recent expenses */}
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">
            Recent Expenses
          </h2>
          {expenses.length === 0 ? (
            <p className="text-sm text-text-secondary py-4 text-center">
              No expenses this month. Tap + to add one!
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              <AnimatePresence mode="popLayout">
                {expenses.slice(0, 5).map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={deleteExpense}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
