import { getBookById } from "@/lib/book.api";
import BookDetailsClient from "@/components/books/book-details-client";

interface Props {
  params: Promise<{ id: string }>
}

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;
  const book = await getBookById(Number(id));

  if (!book) {
    return <p className="p-6 text-center">Book not found</p>;
  }

  return <BookDetailsClient book={book} />;
}
