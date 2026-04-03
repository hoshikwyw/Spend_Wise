"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, Wallet, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/expenses", icon: Receipt, label: "Expenses" },
  { href: "#fab", icon: Plus, label: "Add", isFab: true },
  { href: "/budget", icon: Wallet, label: "Budget" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

interface BottomNavProps {
  onFabClick: () => void;
}

export function BottomNav({ onFabClick }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-bg-secondary/80 backdrop-blur-xl border-t border-border/50">
        <div className="flex items-center justify-around px-2 py-1.5">
          {navItems.map(({ href, icon: Icon, label, isFab }) => {
            if (isFab) {
              return (
                <button
                  key="fab"
                  onClick={onFabClick}
                  className="flex items-center justify-center -mt-6 h-14 w-14 rounded-2xl bg-accent text-white shadow-lg shadow-accent/30 active:scale-95 transition-transform"
                >
                  <Plus className="h-6 w-6" />
                </button>
              );
            }

            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[3.5rem] transition-colors",
                  active ? "text-accent" : "text-text-secondary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Safe area spacer */}
      <div className="h-[env(safe-area-inset-bottom)] bg-bg-secondary/80" />
    </nav>
  );
}
