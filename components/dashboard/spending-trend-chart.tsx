"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Expense } from "@/lib/types";

interface SpendingTrendChartProps {
  expenses: Expense[];
  month: string;
}

export function SpendingTrendChart({ expenses, month }: SpendingTrendChartProps) {
  // Build daily spending data for the month
  const [year, m] = month.split("-").map(Number);
  const daysInMonth = new Date(year, m, 0).getDate();

  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${month.substring(0, 7)}-${String(day).padStart(2, "0")}`;
    const dayTotal = expenses
      .filter((e) => e.expense_date === dateStr)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    return {
      day: String(day),
      amount: dayTotal,
    };
  });

  // Calculate cumulative
  let cumulative = 0;
  const cumulativeData = dailyData.map((d) => {
    cumulative += d.amount;
    return { ...d, cumulative };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
      </CardHeader>
      <div className="h-36 sm:h-48 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cumulativeData}>
            <defs>
              <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }}
              interval="preserveStartEnd"
            />
            <YAxis hide />
            <Tooltip
              content={({ payload, label }) => {
                if (!payload?.length) return null;
                return (
                  <div className="rounded-xl bg-bg-secondary border border-border px-3 py-2 shadow-soft text-xs">
                    <p className="text-text-secondary">Day {label}</p>
                    <p className="font-medium text-text-primary">
                      {formatCurrency(payload[0].value as number)}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#accentGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
