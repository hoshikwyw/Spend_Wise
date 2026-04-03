"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { ACCENT_PRESETS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, Palette } from "lucide-react";

export function AccentColorPicker() {
  const { accentColor, setAccentColor } = useTheme();
  const [customColor, setCustomColor] = useState(accentColor);
  const [showCustom, setShowCustom] = useState(false);

  const isPreset = ACCENT_PRESETS.some((p) => p.color === accentColor);

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-text-secondary">
        Accent Color
      </label>

      {/* Preset swatches */}
      <div className="flex flex-wrap gap-2.5 sm:gap-2">
        {ACCENT_PRESETS.map((preset) => (
          <button
            key={preset.color}
            onClick={() => {
              setAccentColor(preset.color);
              setShowCustom(false);
            }}
            className={cn(
              "relative h-10 w-10 sm:h-9 sm:w-9 rounded-xl transition-all duration-200 active:scale-90",
              accentColor === preset.color && "ring-2 ring-offset-2 ring-offset-bg-secondary"
            )}
            style={{
              backgroundColor: preset.color,
              // @ts-expect-error ring color via CSS custom property
              "--tw-ring-color": preset.color,
            }}
            title={preset.name}
          >
            {accentColor === preset.color && (
              <Check className="h-4 w-4 text-white absolute inset-0 m-auto" />
            )}
          </button>
        ))}

        {/* Custom color button */}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={cn(
            "relative h-10 w-10 sm:h-9 sm:w-9 rounded-xl border-2 border-dashed border-border flex items-center justify-center transition-all duration-200 active:scale-90 hover:border-accent",
            !isPreset && "ring-2 ring-offset-2 ring-offset-bg-secondary ring-accent"
          )}
          style={!isPreset ? { backgroundColor: accentColor } : undefined}
        >
          {!isPreset ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <Palette className="h-3.5 w-3.5 text-text-secondary" />
          )}
        </button>
      </div>

      {/* Custom color input */}
      {showCustom && (
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="h-9 w-9 rounded-lg border border-border cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                setCustomColor(val);
              }
            }}
            placeholder="#8B5CF6"
            className="flex-1 rounded-[var(--radius-input)] border border-border bg-bg-tertiary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent font-mono"
          />
          <button
            onClick={() => {
              if (/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
                setAccentColor(customColor);
              }
            }}
            className="px-3 py-2 rounded-[var(--radius-button)] bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
