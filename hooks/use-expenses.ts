"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Expense, Category } from "@/lib/types";

export function useExpenses(month?: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    if (data) setCategories(data);
  }, [supabase]);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("expenses")
      .select("*, category:categories(*)")
      .order("expense_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (month) {
      const start = month; // e.g. "2026-04-01"
      const [y, m] = month.split("-").map(Number);
      const end = new Date(y, m, 1).toISOString().split("T")[0];
      query = query.gte("expense_date", start).lt("expense_date", end);
    }

    const { data } = await query;
    if (data) setExpenses(data);
    setLoading(false);
  }, [supabase, month]);

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, [fetchCategories, fetchExpenses]);

  const addExpense = async (expense: {
    category_id: string;
    amount: number;
    note?: string;
    expense_date: string;
  }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("expenses").insert({
      ...expense,
      user_id: user.id,
    });

    if (!error) {
      await fetchExpenses();
    }
    return { error };
  };

  const deleteExpense = async (id: string) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (!error) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
    return { error };
  };

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const spendingByCategory = categories
    .map((cat) => {
      const catExpenses = expenses.filter((e) => e.category_id === cat.id);
      const total = catExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
      return { ...cat, total };
    })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  return {
    expenses,
    categories,
    loading,
    totalSpent,
    spendingByCategory,
    addExpense,
    deleteExpense,
    refresh: fetchExpenses,
  };
}
