import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBooks } from "@/lib/book.api";
import EditBookDialog from "./edit-book-dialog";
import DeleteBookDialog from "./delete-book-dialog";

export default async function BookTable() {
  const books = await getBooks();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Title</TableHead>
            <TableHead className="text-black">Author</TableHead>
            <TableHead className="text-black">Price</TableHead>
            <TableHead className="text-black">Stock</TableHead>
            <TableHead className="text-black">Status</TableHead>
            <TableHead className="text-right text-black">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>₹{book.price}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell>
                {book.stock > 0 ? "In Stock" : "Out of Stock"}
              </TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <EditBookDialog book={book} />
                <DeleteBookDialog bookId={book.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
