import BookGrid from "@/components/books/BookGrid"
import SearchBar from "@/components/books/SearchBar";
import { getBooks } from "@/lib/book.api"

export default async function BooksPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {

  const { q } = await searchParams;

  const books = await getBooks(q);

  return (
   <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Explore Books
          </h1>
          <p className="text-slate-400 max-w-xl">
            Discover your next favorite book from our curated collection
          </p>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Books */}
        <BookGrid books={books} />
      </div>
  </main>

  );
}