"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Expense, Category } from "@/lib/types";

interface DateRange {
  start: string;
  end: string;
}

export function useExpenses(range?: DateRange | string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // Normalize: if string (legacy month), convert to range
  const dateRange: DateRange | undefined =
    typeof range === "string"
      ? (() => {
          const [y, m] = range.split("-").map(Number);
          return {
            start: range,
            end: new Date(y, m, 1).toISOString().split("T")[0],
          };
        })()
      : range;

  const rangeKey = dateRange ? `${dateRange.start}_${dateRange.end}` : "all";

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

    if (dateRange) {
      query = query.gte("expense_date", dateRange.start).lt("expense_date", dateRange.end);
    }

    const { data } = await query;
    if (data) setExpenses(data);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, rangeKey]);

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
