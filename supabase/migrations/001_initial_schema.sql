-- Profiles table (auto-created on user signup)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Categories table (defaults + user custom)
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  emoji text not null default '📦',
  color text not null default '#8B5CF6',
  is_default boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table public.categories enable row level security;
create policy "Users see own + default categories" on public.categories for select using (is_default = true or auth.uid() = user_id);
create policy "Users insert own categories" on public.categories for insert with check (auth.uid() = user_id);
create policy "Users update own categories" on public.categories for update using (auth.uid() = user_id);
create policy "Users delete own categories" on public.categories for delete using (auth.uid() = user_id);

-- Seed default categories
insert into public.categories (name, emoji, color, is_default, sort_order) values
  ('Food & Drinks', '🍔', '#F97316', true, 0),
  ('Transport', '🚗', '#3B82F6', true, 1),
  ('Shopping', '🛍️', '#EC4899', true, 2),
  ('Subscriptions', '🔁', '#8B5CF6', true, 3),
  ('Entertainment', '🎮', '#10B981', true, 4),
  ('Health', '💊', '#EF4444', true, 5),
  ('Education', '📚', '#F59E0B', true, 6),
  ('Other', '📦', '#6B7280', true, 7);

-- Expenses table
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid not null references public.categories(id),
  amount decimal(12,2) not null,
  note text,
  expense_date date not null default current_date,
  created_at timestamptz default now()
);

create index idx_expenses_user_date on public.expenses(user_id, expense_date desc);

alter table public.expenses enable row level security;
create policy "Users manage own expenses" on public.expenses for all using (auth.uid() = user_id);

-- Budgets table
create table public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month date not null,
  amount decimal(12,2) not null,
  created_at timestamptz default now(),
  unique(user_id, month)
);

alter table public.budgets enable row level security;
create policy "Users manage own budgets" on public.budgets for all using (auth.uid() = user_id);

-- User preferences table
create table public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'system',
  accent_color text not null default '#8B5CF6',
  currency text not null default 'MMK',
  updated_at timestamptz default now()
);

alter table public.user_preferences enable row level security;
create policy "Users manage own preferences" on public.user_preferences for all using (auth.uid() = user_id);

-- Trigger: auto-create profile + preferences on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  insert into public.user_preferences (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
