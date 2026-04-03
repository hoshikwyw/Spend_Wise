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
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
      {categories.map((cat, i) => (
        <motion.button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2.5 rounded-full border whitespace-nowrap text-sm font-semibold transition-all duration-200 shrink-0",
            selected === cat.id
              ? "border-accent bg-accent/10 text-accent shadow-sm shadow-accent/10 scale-[1.03]"
              : "border-border/50 bg-bg-tertiary/50 text-text-secondary hover:border-accent/30 hover:bg-accent/5"
          )}
        >
          <span className={cn("text-lg", selected === cat.id && "animate-wiggle")}>{cat.emoji}</span>
          <span>{cat.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
