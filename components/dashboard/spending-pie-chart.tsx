"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface SpendingData {
  name: string;
  emoji: string;
  color: string;
  total: number;
}

interface SpendingPieChartProps {
  data: SpendingData[];
  totalSpent: number;
}

export function SpendingPieChart({ data, totalSpent }: SpendingPieChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-center h-32 sm:h-48 text-sm text-text-secondary">
          No spending data yet
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>

      {/* Stacked on mobile, side-by-side on larger */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="total"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-xl bg-bg-secondary border border-border px-3 py-2 shadow-soft text-xs">
                      <span className="mr-1">{d.emoji}</span>
                      <span className="font-medium">{d.name}</span>
                      <span className="ml-2 text-text-secondary">
                        {formatCurrency(d.total)}
                      </span>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[9px] sm:text-[10px] text-text-secondary">Total</span>
            <span className="text-xs sm:text-sm font-bold text-text-primary">
              {formatCurrency(totalSpent)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 w-full sm:flex-1 sm:min-w-0">
          {data.slice(0, 5).map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-text-secondary truncate flex-1">
                {item.emoji} {item.name}
              </span>
              <span className="text-xs font-medium text-text-primary shrink-0">
                {formatCurrency(item.total)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
