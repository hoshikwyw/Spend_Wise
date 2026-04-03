"use client";

import { useState } from "react";
import { useBudget } from "@/hooks/use-budget";
import { useExpenses } from "@/hooks/use-expenses";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatCurrency, getMonthStart, getMonthName } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Target } from "lucide-react";

export default function BudgetPage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [editAmount, setEditAmount] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const month = getMonthStart(targetDate);

  const { budget, setBudgetAmount } = useBudget(month);
  const { totalSpent, spendingByCategory } = useExpenses(month);

  const budgetAmount = budget?.amount ? Number(budget.amount) : 0;
  const percentage = budgetAmount > 0 ? (totalSpent / budgetAmount) * 100 : 0;
  const remaining = budgetAmount - totalSpent;

  const handleSave = async () => {
    const amount = parseFloat(editAmount);
    if (!amount || amount <= 0) return;
    setSaving(true);
    await setBudgetAmount(amount);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-primary font-display">
          Budget
        </h1>
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

      <div className="space-y-4">
        {/* Budget card */}
        <Card>
          {budgetAmount > 0 && !editing ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-text-primary">
                    Monthly Budget
                  </span>
                </div>
                <button
                  onClick={() => {
                    setEditAmount(String(budgetAmount));
                    setEditing(true);
                  }}
                  className="text-xs text-accent hover:underline"
                >
                  Edit
                </button>
              </div>

              <p className="text-3xl font-bold text-text-primary font-display mb-4">
                {formatCurrency(budgetAmount)}
              </p>

              <ProgressBar value={percentage} colorByValue showLabel />

              <div className="flex justify-between mt-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs text-text-secondary">Spent</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatCurrency(totalSpent)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-secondary">Remaining</p>
                  <p
                    className={`text-lg font-semibold ${
                      remaining >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {remaining >= 0
                      ? formatCurrency(remaining)
                      : `-${formatCurrency(Math.abs(remaining))}`}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-text-primary">
                  {editing ? "Edit Budget" : "Set Monthly Budget"}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="e.g. 1000"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
                {editing && (
                  <Button variant="ghost" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Category breakdown */}
        {spendingByCategory.length > 0 && (
          <Card>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Category Breakdown
            </h3>
            <div className="space-y-3">
              {spendingByCategory.map((cat) => {
                const catPct = budgetAmount > 0 ? (cat.total / budgetAmount) * 100 : 0;
                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{cat.emoji}</span>
                        <span className="text-xs font-medium text-text-primary">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-text-secondary">
                        {formatCurrency(cat.total)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(catPct, 100)}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
