"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface MonthlySummaryCardProps {
  totalSpent: number;
  expenseCount: number;
}

export function MonthlySummaryCard({
  totalSpent,
  expenseCount,
}: MonthlySummaryCardProps) {
  return (
    <Card className="bg-gradient-accent text-white border-none relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full" />
      <div className="absolute top-3 right-16 animate-sparkle pointer-events-none">
        <Sparkles className="h-4 w-4 text-white/30" />
      </div>

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-white/70 font-medium">This Month</p>
          <p className="text-3xl font-bold mt-1.5 font-display">
            {formatCurrency(totalSpent)}
          </p>
          <p className="text-sm text-white/60 mt-1.5">
            {expenseCount} expense{expenseCount !== 1 ? "s" : ""}{" "}
            {expenseCount === 0 && "~ stay strong!"}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl animate-bounce-gentle">
          {totalSpent === 0 ? "🎉" : totalSpent > 500000 ? "😅" : "💰"}
        </div>
      </div>
    </Card>
  );
}
