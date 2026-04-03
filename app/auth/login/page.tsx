"use client";

import { createClient } from "@/lib/supabase/client";
import { Wallet, Sparkles, Heart } from "lucide-react";

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-cute relative overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/8 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-pink-300/10 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Floating emojis */}
      <div className="absolute top-1/4 left-16 text-3xl animate-float opacity-20 pointer-events-none select-none">💰</div>
      <div className="absolute bottom-1/3 right-20 text-2xl animate-float-slow opacity-20 pointer-events-none select-none">✨</div>
      <div className="absolute top-1/3 right-1/4 text-2xl animate-wiggle opacity-15 pointer-events-none select-none">🌸</div>

      <div className="w-full max-w-sm mx-auto px-6 relative">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-accent text-white shadow-xl shadow-accent/30 animate-bounce-gentle">
                <Wallet className="h-8 w-8" />
              </div>
              {/* Sparkle decoration */}
              <div className="absolute -top-1 -right-1 text-accent animate-sparkle">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-text-primary font-display">
              SpendWise
            </h1>
          </div>

          <p className="text-text-secondary text-center text-sm leading-relaxed">
            Track your spending, reach your goals ~
            <br />
            <span className="text-accent/70">Simple & cute</span> expense tracking for you
            <Heart className="inline h-3 w-3 text-pink-400 fill-pink-400 ml-1" />
          </p>

          {/* Card */}
          <div className="w-full rounded-[var(--radius-card)] bg-bg-secondary/80 backdrop-blur-sm border border-border/50 p-8 shadow-soft">
            <p className="text-center text-2xl mb-4">🐷</p>
            <button
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-bg-primary px-5 py-3.5 text-sm font-semibold text-text-primary transition-all hover:bg-bg-tertiary hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-xs text-text-secondary/50">
            Your data stays private and secure 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
