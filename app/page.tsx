import Link from "next/link";
import {
  Wallet,
  PieChart,
  Zap,
  Palette,
  ArrowRight,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Quick Add",
    desc: "Add expenses in seconds. Amount, category, done. Super easy!",
    emoji: "⚡",
  },
  {
    icon: PieChart,
    title: "Visual Insights",
    desc: "Beautiful charts showing where your money goes. So pretty!",
    emoji: "🍩",
  },
  {
    icon: Palette,
    title: "Your Style",
    desc: "Custom colors, dark mode, and a cute minimalist design.",
    emoji: "🎨",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-cute overflow-hidden relative">
      {/* Floating decorative blobs — hidden on small screens to save performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="hidden sm:block absolute top-40 right-10 w-48 h-48 bg-pink-300/10 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="hidden sm:block absolute bottom-20 left-1/3 w-56 h-56 bg-accent/5 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Nav */}
      <header className="relative flex items-center justify-between px-4 sm:px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-accent text-white shadow-lg shadow-accent/25 animate-bounce-gentle">
            <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-text-primary font-display">
            SpendWise
          </span>
        </div>
        <Link
          href="/auth/login"
          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-accent text-white text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all active:scale-95"
        >
          Get Started
        </Link>
      </header>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 max-w-3xl mx-auto text-center">
        {/* Floating emojis — hidden on mobile */}
        <div className="hidden sm:block absolute top-8 left-12 text-3xl animate-float opacity-40 pointer-events-none select-none">💰</div>
        <div className="hidden sm:block absolute top-16 right-16 text-2xl animate-float-slow opacity-30 pointer-events-none select-none" style={{ animationDelay: "1s" }}>✨</div>
        <div className="hidden sm:block absolute bottom-16 left-20 text-2xl animate-float opacity-30 pointer-events-none select-none" style={{ animationDelay: "3s" }}>🌸</div>
        <div className="hidden sm:block absolute bottom-8 right-24 text-3xl animate-wiggle opacity-30 pointer-events-none select-none">💜</div>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] sm:text-xs font-semibold mb-6 sm:mb-8">
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          Simple & cute expense tracking
          <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-text-primary font-display leading-tight mb-4 sm:mb-5">
          Know where your
          <br />
          <span className="bg-gradient-to-r from-accent via-pink-500 to-accent bg-clip-text text-transparent">
            money goes
          </span>
          <span className="inline-block ml-1 sm:ml-2 animate-wiggle text-2xl sm:text-5xl">💸</span>
        </h1>

        <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Track spending, set budgets, and see beautiful insights.
          Minimalist, adorable, and made just for you ~
        </p>

        <Link
          href="/auth/login"
          className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-accent text-white text-sm font-semibold shadow-xl shadow-accent/25 hover:shadow-2xl hover:shadow-accent/30 transition-all active:scale-95"
        >
          <Star className="h-4 w-4 fill-current" />
          Start Tracking
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <p className="text-[10px] sm:text-xs text-text-secondary/50 mt-3 sm:mt-4">
          Free forever ~ No credit card needed
        </p>
      </section>

      {/* Features */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {features.map(({ title, desc, emoji }, i) => (
            <div
              key={title}
              className="group rounded-[var(--radius-card)] bg-bg-secondary border border-border/50 p-5 sm:p-7 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-accent/10 text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:animate-wiggle">
                {emoji}
              </div>
              <h3 className="text-sm font-bold text-text-primary mb-1 sm:mb-1.5 font-display">
                {title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cute CTA section */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20 max-w-2xl mx-auto text-center">
        <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-accent p-6 sm:p-10 shadow-2xl shadow-accent/20 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full" />
          <div className="absolute top-4 left-8 text-white/20 animate-sparkle">
            <Star className="h-4 w-4 fill-current" />
          </div>

          <p className="text-2xl sm:text-3xl mb-2">🐷</p>
          <h2 className="text-lg sm:text-xl font-bold text-white font-display mb-2">
            Ready to save smarter?
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mb-5 sm:mb-6">
            Join SpendWise and take control of your spending ~
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-accent text-sm font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            Let&apos;s Go!
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-6 sm:py-8 text-center border-t border-border/30">
        <p className="text-[10px] sm:text-xs text-text-secondary">
          Made with <Heart className="inline h-3 w-3 text-pink-400 fill-pink-400 mx-0.5" /> for your wallet. SpendWise 2026.
        </p>
      </footer>
    </div>
  );
}
