import BookGrid from "@/components/books/BookGrid"
import { getBooks } from "@/lib/book.api"

export default async function BooksPage() {

  const books = await getBooks();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">
          Explore Books
        </h1>

        <BookGrid books={books} />
      </div>
    </main>
  )
}
