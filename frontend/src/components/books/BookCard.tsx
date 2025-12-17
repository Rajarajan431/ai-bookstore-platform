
import Link from "next/link";
import { Book } from "@/types/book";
import { Button } from "../ui/button";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <img src={book.imageUrl} alt={book.title} 
        className="mb-2 w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-gray-600">${book.price}</p>

      <Button size="lg" variant="secondary" className="gap-2 mt-2">
        <Link href={`/books/${book.id}`} 
          className="inline-block text-blue-600">
          View Details
        </Link>
      </Button>

    </div>
  );
}
