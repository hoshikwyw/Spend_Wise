"use client";

import { useState, useRef, useCallback } from "react";
import { useExpenses } from "@/hooks/use-expenses";
import { ExpenseList } from "@/components/expenses/expense-list";
import { SpendingSummaryCard } from "@/components/expenses/spending-summary-card";
import { getDateRange, formatCurrency } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  CalendarDays,
  CalendarRange,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type FilterType = "daily" | "monthly" | "yearly";

const filterTabs: { value: FilterType; label: string; emoji: string; icon: typeof Calendar }[] = [
  { value: "daily", label: "Daily", emoji: "📅", icon: Calendar },
  { value: "monthly", label: "Monthly", emoji: "📆", icon: CalendarDays },
  { value: "yearly", label: "Yearly", emoji: "🗓️", icon: CalendarRange },
];

export default function ExpensesPage() {
  const [filter, setFilter] = useState<FilterType>("monthly");
  const [offset, setOffset] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { accentColor } = useTheme();
  const range = getDateRange(filter, offset);
  const { expenses, loading, totalSpent, spendingByCategory, deleteExpense } =
    useExpenses({ start: range.start, end: range.end });

  const canDownload = filter === "daily" || filter === "monthly";

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { downloadAsImage } = await import("@/lib/download-image");
      const filename = `spendwise-${filter}-${range.start}.png`;
      await downloadAsImage(cardRef.current, filename);
    } finally {
      setDownloading(false);
    }
  }, [filter, range.start]);

  const summarySubtitle =
    filter === "daily" ? "Daily Summary" : "Monthly Summary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary font-display flex items-center gap-2">
            Expenses
            <span className="text-lg sm:text-xl">📝</span>
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            {formatCurrency(totalSpent)} spent
          </p>
        </div>

        {/* Download button */}
        {canDownload && expenses.length > 0 && (
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent/10 text-accent text-[11px] sm:text-xs font-semibold hover:bg-accent/20 active:scale-95 transition-all shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Save as</span> Image
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 sm:gap-1.5 p-1 rounded-2xl bg-bg-tertiary mb-4 sm:mb-5">
        {filterTabs.map(({ value, label, emoji }) => (
          <button
            key={value}
            onClick={() => {
              setFilter(value);
              setOffset(0);
            }}
            className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
              filter === value
                ? "bg-bg-secondary shadow-sm text-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className={filter === value ? "animate-wiggle" : ""}>{emoji}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Date navigator */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setOffset((o) => o - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all active:scale-90"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <motion.span
          key={range.label}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm font-semibold text-text-primary min-w-0 flex-1 text-center font-display truncate px-1"
        >
          {range.label}
        </motion.span>
        <button
          onClick={() => setOffset((o) => o + 1)}
          disabled={offset >= 0}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all disabled:opacity-30 active:scale-90"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Summary stats bar */}
      {!loading && expenses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
          <div className="rounded-2xl bg-bg-secondary border border-border/50 p-2.5 sm:p-3.5 text-center">
            <p className="text-base sm:text-lg font-bold text-text-primary font-display">
              {expenses.length}
            </p>
            <p className="text-[9px] sm:text-[10px] text-text-secondary font-semibold">
              Expenses
            </p>
          </div>
          <div className="rounded-2xl bg-bg-secondary border border-border/50 p-2.5 sm:p-3.5 text-center">
            <p className="text-xs sm:text-lg font-bold text-accent font-display truncate">
              {formatCurrency(totalSpent)}
            </p>
            <p className="text-[9px] sm:text-[10px] text-text-secondary font-semibold">
              Total
            </p>
          </div>
          <div className="rounded-2xl bg-bg-secondary border border-border/50 p-2.5 sm:p-3.5 text-center">
            <p className="text-base sm:text-lg font-bold text-text-primary font-display">
              {spendingByCategory.length > 0 ? spendingByCategory[0].emoji : "~"}
            </p>
            <p className="text-[9px] sm:text-[10px] text-text-secondary font-semibold truncate">
              Top Category
            </p>
          </div>
        </motion.div>
      )}

      {/* Expense list */}
      <ExpenseList expenses={expenses} loading={loading} onDelete={deleteExpense} />

      {/* Download preview modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setShowPreview(false)}
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 flex flex-col items-center gap-4 sm:gap-5 w-full sm:w-auto bg-bg-secondary sm:bg-transparent rounded-t-[2rem] sm:rounded-none p-5 sm:p-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 sm:-top-2 sm:-right-2 flex h-8 w-8 items-center justify-center rounded-full bg-bg-tertiary sm:bg-bg-secondary text-text-secondary hover:text-text-primary shadow-lg z-20 hover:rotate-90 transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Drag handle mobile */}
              <div className="w-10 h-1 rounded-full bg-border/60 sm:hidden shrink-0" />

              {/* Preview card — scale down on small screens */}
              <div className="rounded-[2rem] shadow-2xl overflow-hidden scale-[0.85] sm:scale-100 origin-top">
                <SpendingSummaryCard
                  ref={cardRef}
                  title={range.label}
                  subtitle={summarySubtitle}
                  totalSpent={totalSpent}
                  expenseCount={expenses.length}
                  spendingByCategory={spendingByCategory}
                  accentColor={accentColor}
                />
              </div>

              {/* Download button */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-accent text-white text-sm font-bold shadow-xl shadow-accent/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 w-full sm:w-auto justify-center"
              >
                <Download className="h-4 w-4" />
                {downloading ? "Saving..." : "Download Image ✨"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
