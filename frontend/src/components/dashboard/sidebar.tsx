import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-950 p-6">
  
        {/* Brand */}
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
          Bookstore
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col space-y-1">
          <Link
            href="/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/books"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Books
          </Link>

          <Link
            href="/dashboard/orders"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Orders
          </Link>

          <Link
            href="/dashboard/settings"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Settings
          </Link>
        </nav>
    </aside>

  );
}
