import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/25 active:shadow-sm",
  secondary:
    "bg-bg-tertiary text-text-primary hover:bg-border active:bg-border",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
