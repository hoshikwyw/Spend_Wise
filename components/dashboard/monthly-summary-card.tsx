"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MonthlySummaryCardProps {
  totalSpent: number;
  expenseCount: number;
}

export function MonthlySummaryCard({
  totalSpent,
  expenseCount,
}: MonthlySummaryCardProps) {
  return (
    <Card className="bg-accent text-white border-none">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/70 font-medium">This Month</p>
          <p className="text-3xl font-bold mt-1 font-display">
            {formatCurrency(totalSpent)}
          </p>
          <p className="text-sm text-white/60 mt-1">
            {expenseCount} expense{expenseCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
          {totalSpent > 0 ? (
            <TrendingUp className="h-5 w-5" />
          ) : (
            <TrendingDown className="h-5 w-5" />
          )}
        </div>
      </div>
    </Card>
  );
}
