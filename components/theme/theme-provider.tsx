"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { deriveAccentShades } from "@/lib/utils";
import { DEFAULT_ACCENT } from "@/lib/constants";
import type { ThemeMode } from "@/lib/types";

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  accentColor: string;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "system",
  resolvedMode: "light",
  accentColor: DEFAULT_ACCENT,
  setMode: () => {},
  setAccentColor: () => {},
});

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", resolved);
}

function applyAccent(hex: string) {
  const shades = deriveAccentShades(hex);
  document.documentElement.style.setProperty("--color-accent", shades.base);
  document.documentElement.style.setProperty("--color-accent-light", shades.light);
  document.documentElement.style.setProperty("--color-accent-dark", shades.dark);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [accentColor, setAccentState] = useState(DEFAULT_ACCENT);
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  // Load preferences from Supabase on mount
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("user_preferences")
        .select("theme, accent_color")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setModeState(data.theme as ThemeMode);
            setAccentState(data.accent_color);
            applyAccent(data.accent_color);
          }
        });
    });
  }, []);

  // Resolve and apply theme mode
  useEffect(() => {
    const resolved = mode === "system" ? getSystemTheme() : mode;
    setResolvedMode(resolved);
    applyTheme(resolved);

    if (mode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        const r = e.matches ? "dark" : "light";
        setResolvedMode(r);
        applyTheme(r);
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [mode]);

  // Apply accent on state change
  useEffect(() => {
    applyAccent(accentColor);
  }, [accentColor]);

  const persistPreferences = useCallback(
    async (theme: ThemeMode, accent: string) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      await supabase
        .from("user_preferences")
        .update({ theme, accent_color: accent, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);
    },
    []
  );

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      persistPreferences(newMode, accentColor);
    },
    [accentColor, persistPreferences]
  );

  const setAccentColor = useCallback(
    (color: string) => {
      setAccentState(color);
      persistPreferences(mode, color);
    },
    [mode, persistPreferences]
  );

  return (
    <ThemeContext.Provider
      value={{ mode, resolvedMode, accentColor, setMode, setAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
