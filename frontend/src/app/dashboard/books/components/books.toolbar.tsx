import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import AddBookDialog from "./add-book-dialog";

export default function BooksToolbar() {
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Search books..."
        className="max-w-sm"
      />

      <AddBookDialog>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </AddBookDialog>
    </div>
  );
}
