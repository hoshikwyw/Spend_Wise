import Link from "next/link";
import {
  Wallet,
  PieChart,
  Zap,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Quick Add",
    desc: "Add expenses in seconds. Amount, category, done.",
  },
  {
    icon: PieChart,
    title: "Visual Insights",
    desc: "Beautiful charts showing where your money goes.",
  },
  {
    icon: Palette,
    title: "Your Style",
    desc: "Custom colors, dark mode, and a cute minimalist design.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white">
            <Wallet className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-text-primary font-display">
            SpendWise
          </span>
        </div>
        <Link
          href="/auth/login"
          className="px-4 py-2 rounded-[var(--radius-button)] bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          Get Started
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 pb-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-6">
          <Sparkles className="h-3 w-3" />
          Simple expense tracking for Gen Z
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary font-display leading-tight mb-4">
          Know where your
          <br />
          <span className="text-accent">money goes</span>
        </h1>

        <p className="text-text-secondary text-base sm:text-lg max-w-md mx-auto mb-8">
          Track spending, set budgets, and see beautiful insights.
          Minimalist, cute, and made just for you.
        </p>

        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-button)] bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-all hover:gap-3 shadow-lg shadow-accent/25"
        >
          Start Tracking
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-[var(--radius-card)] bg-bg-secondary border border-border/50 p-6 shadow-soft hover:shadow-hover transition-shadow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">
                {title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t border-border/50">
        <p className="text-xs text-text-secondary">
          Made with care for your wallet. SpendWise 2026.
        </p>
      </footer>
    </div>
  );
}
