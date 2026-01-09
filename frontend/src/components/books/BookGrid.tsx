
import BookCard from "./BookCard";

import { Book } from "@/types/book";

export default function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>

  );
}
