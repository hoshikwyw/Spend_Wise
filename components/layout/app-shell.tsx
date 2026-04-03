"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { BottomNav } from "./bottom-nav";
import { QuickAddExpense } from "@/components/expenses/quick-add-expense";
import { Plus } from "lucide-react";

export function AppShell({ children }: { children: ReactNode }) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-cute">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 py-4 sm:py-6 pb-28 md:pb-6">
          {children}
        </div>
      </main>
      <BottomNav onFabClick={() => setShowQuickAdd(true)} />

      {/* Desktop FAB */}
      <button
        onClick={() => setShowQuickAdd(true)}
        className="hidden md:flex fixed bottom-8 right-8 h-14 w-14 items-center justify-center rounded-full bg-gradient-accent text-white shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:scale-110 active:scale-90 transition-all z-40 group"
      >
        <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
      </button>

      <QuickAddExpense
        open={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
      />
    </div>
  );
}
