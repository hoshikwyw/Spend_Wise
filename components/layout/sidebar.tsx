"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, Wallet, Settings, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", emoji: "🏠" },
  { href: "/expenses", icon: Receipt, label: "Expenses", emoji: "📝" },
  { href: "/budget", icon: Wallet, label: "Budget", emoji: "🎯" },
  { href: "/settings", icon: Settings, label: "Settings", emoji: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border/50 bg-bg-secondary h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-accent text-white shadow-lg shadow-accent/20 animate-bounce-gentle">
          <Wallet className="h-5 w-5" />
        </div>
        <div>
          <span className="text-lg font-bold text-text-primary font-display block leading-tight">
            SpendWise
          </span>
          <span className="text-[10px] text-text-secondary flex items-center gap-1">
            <Sparkles className="h-2.5 w-2.5 text-accent" />
            cute tracker
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, emoji }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
                active
                  ? "bg-accent/10 text-accent shadow-sm"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              )}
            >
              <span className={cn("text-base", active && "animate-wiggle")}>{emoji}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-border/30">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-medium text-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
