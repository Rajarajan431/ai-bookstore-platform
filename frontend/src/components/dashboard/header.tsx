"use client";

import { useAppSelector } from "@/store/hooks";
import { LogoutButton } from "@/components/auth/logout-button";

export function Header() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
  
      <p className="text-sm text-slate-300">
        Welcome back, <span className="font-medium text-white">{user?.name}</span>
      </p>

      <LogoutButton />
    </header>

  );
}
