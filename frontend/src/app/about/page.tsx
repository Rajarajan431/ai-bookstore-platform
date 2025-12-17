export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl space-y-16">

        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            About Bookstore
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            A modern platform designed to simplify buying and selling books —
            built for readers, authors, and independent sellers.
          </p>
        </section>

        {/* Mission */}
        <section className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Our mission is to create a simple, reliable, and scalable online
              bookstore where users can explore, purchase, and manage books
              effortlessly. We aim to empower sellers while providing readers
              with a seamless shopping experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Why Bookstore?</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Unlike traditional platforms, Bookstore focuses on clean design,
              fast performance, and modern technology. Every feature is built
              with scalability and user experience in mind.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="mb-8 text-center text-2xl font-semibold">
            What We Believe In
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ValueCard
              title="Simplicity"
              description="Clear interfaces and intuitive flows for everyone."
            />
            <ValueCard
              title="Performance"
              description="Fast load times and smooth interactions."
            />
            <ValueCard
              title="Scalability"
              description="Built with modern tools to grow with demand."
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-semibold">
            Built With Modern Technology
          </h2>
          <p className="mt-4 text-slate-400">
            Bookstore is built using modern web technologies like Next.js,
            TypeScript, Tailwind CSS, Node.js, Prisma, and SQL databases to ensure
            reliability, security, and scalability.
          </p>
        </section>

      </div>
    </main>
  )
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        {description}
      </p>
    </div>
  )
}
