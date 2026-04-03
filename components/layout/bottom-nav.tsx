"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", emoji: "🏠" },
  { href: "/expenses", label: "Expenses", emoji: "📝" },
  { href: "#fab", label: "Add", emoji: "+", isFab: true },
  { href: "/budget", label: "Budget", emoji: "🎯" },
  { href: "/settings", label: "Settings", emoji: "⚙️" },
];

interface BottomNavProps {
  onFabClick: () => void;
}

export function BottomNav({ onFabClick }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="glass border-t border-border/30">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map(({ href, label, emoji, isFab }) => {
            if (isFab) {
              return (
                <button
                  key="fab"
                  onClick={onFabClick}
                  className="flex items-center justify-center -mt-7 h-14 w-14 rounded-full bg-gradient-accent text-white shadow-xl shadow-accent/30 active:scale-90 hover:scale-105 transition-all"
                >
                  <Plus className="h-6 w-6" strokeWidth={2.5} />
                </button>
              );
            }

            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 min-w-[3.5rem] transition-all duration-200",
                  active ? "text-accent scale-110" : "text-text-secondary"
                )}
              >
                <span className={cn("text-lg", active && "animate-bounce-gentle")}>{emoji}</span>
                <span className="text-[9px] font-semibold">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Safe area spacer */}
      <div className="h-[env(safe-area-inset-bottom)] glass" />
    </nav>
  );
}
