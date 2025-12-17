"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/auth.slice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BookOpen, User, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <BookOpen className="h-6 w-6" />
          <span className="text-lg font-semibold">Bookstore</span>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/books" className="text-slate-300 hover:text-white">
            Books
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-white">
            About
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-slate-300 hover:text-white">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-slate-200"
              >
                Register
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
                  <User className="h-4 w-4" />
                  {user?.name}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 border border-slate-800 bg-slate-900 text-white"
              >
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-red-400 focus:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
