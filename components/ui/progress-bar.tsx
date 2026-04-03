"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  colorByValue?: boolean; // green < 60, yellow 60-85, red > 85
}

export function ProgressBar({
  value,
  className,
  showLabel = false,
  colorByValue = false,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  const getColor = () => {
    if (!colorByValue) return "bg-accent";
    if (clamped < 60) return "bg-emerald-500";
    if (clamped < 85) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 h-2.5 rounded-full bg-bg-tertiary overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getColor())}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-text-secondary min-w-[3rem] text-right">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
