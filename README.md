# SpendWise

A minimalist, cute expense tracker web app built for Gen Z. Track your spending, set budgets, and see beautiful visual insights — all with a customizable theme.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Supabase** (Auth, PostgreSQL, Row Level Security)
- **Tailwind CSS v4** (CSS variables for dynamic theming)
- **Recharts** (pie charts, area charts)
- **Motion** (animations)
- **Lucide React** (icons)

## Features

- **Google Sign-In** via Supabase OAuth
- **Quick Add Expense** — bottom sheet modal, minimal friction (amount + category + done)
- **Smart Categories** — emoji-based categories (Food, Transport, Shopping, etc.)
- **Visual Dashboard** — donut chart, spending trend, budget progress bar
- **Monthly Budgets** — set a budget and track your spending against it
- **Theme Customization** — dark/light/system mode + custom accent color picker
- **Responsive Design** — sidebar on desktop, bottom tab bar + FAB on mobile

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your **Project URL** and **Anon Key** into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the database migration

Copy the contents of `supabase/migrations/001_initial_schema.sql` into the Supabase **SQL Editor** and run it. This creates:

- `profiles` — user profiles (auto-created on signup)
- `categories` — default + custom expense categories
- `expenses` — expense records
- `budgets` — monthly budget amounts
- `user_preferences` — theme, accent color, currency

### 4. Enable Google OAuth

1. Go to Supabase Dashboard > **Authentication** > **Providers** > enable **Google**
2. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com):
   - APIs & Services > Credentials > Create OAuth client ID (Web application)
   - Add redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`
3. Paste the Client ID and Client Secret into Supabase
4. Go to **Authentication** > **URL Configuration**:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
app/
  page.tsx                    # Landing page
  auth/login/page.tsx         # Google sign-in
  auth/callback/route.ts      # OAuth callback
  (app)/
    dashboard/page.tsx        # Charts + summary
    expenses/page.tsx         # Expense list
    budget/page.tsx           # Monthly budget
    settings/page.tsx         # Theme + profile

components/
  ui/                         # Button, Input, Card, Modal, ProgressBar, Badge
  theme/                      # ThemeProvider, ThemeToggle, AccentColorPicker
  layout/                     # AppShell, Sidebar, BottomNav
  expenses/                   # QuickAddExpense, ExpenseList, ExpenseCard, CategoryPicker
  dashboard/                  # SpendingPieChart, SpendingTrendChart, BudgetProgress, MonthlySummaryCard

hooks/                        # useAuth, useExpenses, useBudget, useTheme
lib/                          # Supabase clients, utils, types, constants
```

## Deployment

Deploy on [Vercel](https://vercel.com) — add the same environment variables from `.env.local` to your Vercel project settings.
