import Features from "@/components/home/Features";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          
          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Manage, Buy & Sell Books  
              <span className="block text-slate-400">
                — all in one platform
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              A modern bookstore platform to browse books, manage orders, and
              track purchases with ease.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-slate-200"
              >
                Get Started
              </Link>

              <Link
                href="/books"
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-900"
              >
                Browse Books
              </Link>
            </div>
          </div>

          {/* Visual / Placeholder */}
          <div className="hidden md:block">
            <div className="h-80 rounded-2xl border border-slate-800 bg-slate-900" />
          </div>
        </div>

      </section>
        <Features />
    </div>
  );
}
