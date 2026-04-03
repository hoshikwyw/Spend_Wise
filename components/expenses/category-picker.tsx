"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";
import { motion } from "motion/react";

interface CategoryPickerProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export function CategoryPicker({
  categories,
  selected,
  onSelect,
}: CategoryPickerProps) {
  return (
    <div className="overflow-x-auto scrollbar-none -mx-2 px-2">
      <div className="flex gap-2 pb-1 pt-0.5">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap text-sm font-semibold transition-all duration-200 shrink-0",
              selected === cat.id
                ? "border-accent bg-accent/10 text-accent shadow-sm shadow-accent/10 scale-[1.03]"
                : "border-border/50 bg-bg-tertiary text-text-secondary hover:border-accent/30 hover:bg-accent/5"
            )}
          >
            <span className={cn("text-lg leading-none", selected === cat.id && "animate-wiggle")}>{cat.emoji}</span>
            <span>{cat.name}</span>
          </motion.button>
        ))}
        {/* Right padding spacer so last item isn't cut off */}
        <div className="shrink-0 w-2" aria-hidden />
      </div>
    </div>
  );
}
