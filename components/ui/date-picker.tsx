"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
  }, [open, selected]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelect = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    onChange(str);
    setOpen(false);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const cells: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, current: false });
    }
  }

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const displayDate = selected.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
          open
            ? "border-accent bg-accent/5 text-accent"
            : "border-border/50 bg-bg-tertiary text-text-primary hover:border-accent/30"
        )}
      >
        <CalendarDays className="h-4 w-4 text-accent/60 shrink-0" />
        <span className="truncate">{displayDate}</span>
      </button>

      {/* Calendar dropdown — on mobile it opens upward to avoid being cut off by bottom nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute left-0 right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 z-50 bg-bg-secondary border border-border/50 rounded-2xl shadow-hover p-3 sm:p-4 min-w-[260px]"
          >
            {/* Month/Year header */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all active:scale-90"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs sm:text-sm font-bold text-text-primary font-display">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all active:scale-90"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-[10px] font-semibold text-text-secondary/60 text-center py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-0.5">
              {cells.map(({ day, current }, i) => {
                const cellDate = current
                  ? `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  : "";
                const isSelected = current && cellDate === value;
                const isToday = current && cellDate === todayStr;

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!current}
                    onClick={() => current && handleSelect(day)}
                    className={cn(
                      "h-9 sm:h-8 w-full rounded-lg text-xs font-medium transition-all duration-150 active:scale-90",
                      !current && "text-text-secondary/25 pointer-events-none",
                      current && !isSelected && !isToday && "text-text-primary hover:bg-bg-tertiary",
                      isToday && !isSelected && "text-accent font-bold bg-accent/5",
                      isSelected && "bg-accent text-white font-bold shadow-sm shadow-accent/20 scale-105"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 mt-2 pt-2 border-t border-border/30">
              <button
                type="button"
                onClick={() => {
                  onChange(todayStr);
                  setOpen(false);
                }}
                className="flex-1 text-xs font-semibold text-accent bg-accent/5 hover:bg-accent/10 active:scale-95 rounded-lg py-2 transition-all"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
                  onChange(yStr);
                  setOpen(false);
                }}
                className="flex-1 text-xs font-semibold text-text-secondary bg-bg-tertiary hover:bg-border/50 active:scale-95 rounded-lg py-2 transition-all"
              >
                Yesterday
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
