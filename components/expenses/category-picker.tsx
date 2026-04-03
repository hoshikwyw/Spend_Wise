"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

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
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-full border whitespace-nowrap text-sm font-medium transition-all duration-200 shrink-0",
            selected === cat.id
              ? "border-accent bg-accent/10 text-accent scale-[1.02]"
              : "border-border bg-bg-tertiary text-text-secondary hover:border-accent/50"
          )}
        >
          <span className="text-lg">{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
