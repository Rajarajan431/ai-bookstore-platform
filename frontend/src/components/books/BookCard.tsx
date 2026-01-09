
import Link from "next/link";
import { Book } from "@/types/book";
import { Button } from "../ui/button";
import { BookOpen } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {

  return (
      <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition">

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-1">
          {book.title}
        </h3>

        <p className="text-sm text-slate-400">
          ₹{book.price}
        </p>

        <Button asChild size="sm" className="mt-3 w-full gap-2">
          <Link href={`/books/${book.id}`}>
            <BookOpen className="h-4 w-4" />
            View Details
          </Link>
        </Button>
      </div>
    </div>
  );
}
