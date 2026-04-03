"use client";

import { useExpenses } from "@/hooks/use-expenses";
import { useBudget } from "@/hooks/use-budget";
import { useAuth } from "@/hooks/use-auth";
import { getMonthStart } from "@/lib/utils";
import { MonthlySummaryCard } from "@/components/dashboard/monthly-summary-card";
import { SpendingPieChart } from "@/components/dashboard/spending-pie-chart";
import { SpendingTrendChart } from "@/components/dashboard/spending-trend-chart";
import { BudgetProgress } from "@/components/dashboard/budget-progress";
import { ExpenseCard } from "@/components/expenses/expense-card";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";

function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good morning", emoji: "🌸" };
  if (hour < 17) return { text: "Good afternoon", emoji: "☀️" };
  return { text: "Good evening", emoji: "🌙" };
}

export default function DashboardPage() {
  const month = getMonthStart();
  const { expenses, totalSpent, spendingByCategory, loading, deleteExpense } =
    useExpenses(month);
  const { budget } = useBudget(month);
  const { user } = useAuth();
  const greeting = getGreeting();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 w-48 rounded-2xl bg-bg-tertiary animate-pulse" />
        <div className="h-36 rounded-[var(--radius-card)] bg-bg-tertiary animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-56 rounded-[var(--radius-card)] bg-bg-tertiary animate-pulse" />
          <div className="h-56 rounded-[var(--radius-card)] bg-bg-tertiary animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cute greeting */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-text-primary font-display">
            {greeting.text}, {firstName}!
          </h1>
          <span className="text-2xl animate-wiggle">{greeting.emoji}</span>
        </div>
        <p className="text-sm text-text-secondary flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Here&apos;s your spending overview ~
        </p>
      </div>

      <div className="space-y-4">
        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <MonthlySummaryCard
            totalSpent={totalSpent}
            expenseCount={expenses.length}
          />
        </motion.div>

        {/* Charts row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SpendingPieChart
            data={spendingByCategory}
            totalSpent={totalSpent}
          />
          <BudgetProgress
            budget={budget?.amount ? Number(budget.amount) : null}
            spent={totalSpent}
          />
        </motion.div>

        {/* Trend chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SpendingTrendChart expenses={expenses} month={month} />
        </motion.div>

        {/* Recent expenses */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-bold text-text-primary mb-3 font-display flex items-center gap-2">
            Recent Expenses
            <span className="text-sm">📝</span>
          </h2>
          {expenses.length === 0 ? (
            <div className="rounded-[var(--radius-card)] bg-bg-secondary border border-border/50 p-10 text-center">
              <p className="text-4xl mb-3 animate-bounce-gentle">🐷</p>
              <p className="text-sm font-semibold text-text-primary font-display mb-1">
                No expenses yet!
              </p>
              <p className="text-xs text-text-secondary">
                Tap the + button to add your first expense ~
              </p>
            </div>
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
        </motion.div>
      </div>
    </motion.div>
  );
}
