"use client";

import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AccentColorPicker } from "@/components/theme/accent-color-picker";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut, User, Paintbrush } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-text-primary font-display mb-4 sm:mb-6 flex items-center gap-2">
        Settings
        <span className="text-lg">⚙️</span>
      </h1>

      <div className="space-y-3 sm:space-y-4">
        {/* Profile */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="h-12 w-12 rounded-2xl object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-accent" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {user?.user_metadata?.full_name ||
                  user?.user_metadata?.name ||
                  "User"}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Paintbrush className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold text-text-primary">
              Appearance
            </h2>
          </div>

          <div className="space-y-5">
            {/* Theme mode */}
            <div>
              <label className="text-xs font-medium text-text-secondary mb-2 block">
                Theme
              </label>
              <ThemeToggle />
            </div>

            {/* Accent color */}
            <AccentColorPicker />
          </div>
        </Card>

        {/* Sign out */}
        <Card>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full text-left text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </Card>
      </div>
    </div>
  );
}
