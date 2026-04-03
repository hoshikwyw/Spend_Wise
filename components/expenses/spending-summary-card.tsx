"use client";

import { forwardRef } from "react";
import { formatCurrency } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface SpendingSummaryCardProps {
  title: string;
  subtitle: string;
  totalSpent: number;
  expenseCount: number;
  spendingByCategory: (Category & { total: number })[];
  accentColor: string;
}

export const SpendingSummaryCard = forwardRef<HTMLDivElement, SpendingSummaryCardProps>(
  ({ title, subtitle, totalSpent, expenseCount, spendingByCategory, accentColor }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[380px] p-0 rounded-[2rem] overflow-hidden"
        style={{ fontFamily: "'Nunito', 'Inter', system-ui, sans-serif" }}
      >
        {/* Main card with inline styles for html2canvas compatibility */}
        <div
          style={{
            background: `linear-gradient(145deg, #1a1625 0%, #0f0a1e 100%)`,
            padding: "2rem",
            borderRadius: "2rem",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative blobs */}
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: `${accentColor}20`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "-20px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: `${accentColor}15`,
            }}
          />

          {/* Header */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "20px" }}>🐷</span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: accentColor,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                SpendWise
              </span>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "rgba(255,255,255,0.9)",
                marginTop: "2px",
              }}
            >
              {title}
            </div>
          </div>

          {/* Total */}
          <div
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
              borderRadius: "1.25rem",
              padding: "1.25rem",
              marginBottom: "1.25rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                marginBottom: "4px",
                position: "relative",
              }}
            >
              Total Spent
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#fff",
                position: "relative",
              }}
            >
              {formatCurrency(totalSpent)}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
                marginTop: "2px",
                position: "relative",
              }}
            >
              {expenseCount} expense{expenseCount !== 1 ? "s" : ""} recorded
            </div>
          </div>

          {/* Category breakdown */}
          {spendingByCategory.length > 0 && (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "10px",
                }}
              >
                By Category
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {spendingByCategory.slice(0, 5).map((cat) => {
                  const pct = totalSpent > 0 ? (cat.total / totalSpent) * 100 : 0;
                  return (
                    <div key={cat.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "4px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "14px" }}>{cat.emoji}</span>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.8)",
                            }}
                          >
                            {cat.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {formatCurrency(cat.total)}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div
                        style={{
                          height: "6px",
                          borderRadius: "99px",
                          background: "rgba(255,255,255,0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "99px",
                            width: `${pct}%`,
                            background: cat.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
                fontWeight: 600,
              }}
            >
              Generated by SpendWise
            </span>
            <span style={{ fontSize: "12px" }}>✨</span>
          </div>
        </div>
      </div>
    );
  }
);
SpendingSummaryCard.displayName = "SpendingSummaryCard";
