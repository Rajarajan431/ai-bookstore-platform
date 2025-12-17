export default function Features() {
  return (
    <section className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Everything you need to run a modern bookstore
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Built for buyers, sellers, and admins — simple, fast, and scalable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Feature 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Browse & Discover Books
            </h3>
            <p className="text-slate-400">
              Explore books by category, author, or popularity with a smooth
              browsing experience.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Orders & Payments
            </h3>
            <p className="text-slate-400">
              Place orders, track status, and manage payments with real-time
              updates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Admin Dashboard
            </h3>
            <p className="text-slate-400">
              Manage books, users, and orders from a powerful and intuitive
              dashboard.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
