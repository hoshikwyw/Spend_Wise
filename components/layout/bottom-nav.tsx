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
      <div className="glass">
        <div className="flex items-center justify-around px-1 pt-2 pb-1">
          {navItems.map(({ href, label, emoji, isFab }) => {
            if (isFab) {
              return (
                <button
                  key="fab"
                  onClick={onFabClick}
                  className="flex items-center justify-center -mt-8 h-14 w-14 rounded-full bg-gradient-accent text-white shadow-xl shadow-accent/30 active:scale-90 transition-all"
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
                  "flex flex-col items-center justify-center gap-0.5 min-w-[3rem] min-h-[3rem] rounded-xl transition-all duration-200",
                  active ? "text-accent" : "text-text-secondary"
                )}
              >
                <span className={cn("text-[18px]", active && "animate-bounce-gentle")}>{emoji}</span>
                <span className="text-[9px] font-semibold leading-none">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Safe area for notch phones */}
      <div className="h-[env(safe-area-inset-bottom,0px)] glass" />
    </nav>
  );
}
