

import BooksTable from "./components/books-table";
import BooksToolbar from "./components/books.toolbar";

export default function BooksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Books</h1>
        <p className="text-muted-foreground">
          Manage your bookstore inventory
        </p>
      </div>

      <BooksToolbar />
      <BooksTable />
    </div>
  );
}
