"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatCurrency } from "@/lib/utils";

interface BudgetProgressProps {
  budget: number | null;
  spent: number;
}

export function BudgetProgress({ budget, spent }: BudgetProgressProps) {
  if (!budget) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
        </CardHeader>
        <div className="text-center py-4">
          <p className="text-sm text-text-secondary">
            No budget set for this month
          </p>
          <a
            href="/budget"
            className="text-sm text-accent hover:underline mt-1 inline-block"
          >
            Set a budget
          </a>
        </div>
      </Card>
    );
  }

  const percentage = (spent / budget) * 100;
  const remaining = budget - spent;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        <span className="text-xs text-text-secondary">
          {formatCurrency(budget)}
        </span>
      </CardHeader>

      <ProgressBar value={percentage} colorByValue showLabel />

      <div className="flex justify-between mt-3">
        <div>
          <p className="text-xs text-text-secondary">Spent</p>
          <p className="text-sm font-semibold text-text-primary">
            {formatCurrency(spent)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-secondary">Remaining</p>
          <p
            className={`text-sm font-semibold ${
              remaining >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {remaining >= 0 ? formatCurrency(remaining) : `-${formatCurrency(Math.abs(remaining))}`}
          </p>
        </div>
      </div>
    </Card>
  );
}
