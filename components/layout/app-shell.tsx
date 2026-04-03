"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { BottomNav } from "./bottom-nav";
import { QuickAddExpense } from "@/components/expenses/quick-add-expense";

export function AppShell({ children }: { children: ReactNode }) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 pb-24 md:pb-6">
          {children}
        </div>
      </main>
      <BottomNav onFabClick={() => setShowQuickAdd(true)} />

      {/* Desktop FAB */}
      <button
        onClick={() => setShowQuickAdd(true)}
        className="hidden md:flex fixed bottom-8 right-8 h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 active:scale-95 transition-all z-40"
      >
        <span className="text-2xl font-light">+</span>
      </button>

      <QuickAddExpense
        open={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
      />
    </div>
  );
}
