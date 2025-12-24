"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import BookForm from "@/app/dashboard/books/components/book-form";
import { updateBook } from "@/lib/book.api";
import { useRouter } from "next/navigation";
import { CreateBookInput } from "@/schemas/book.schema";
import { useState } from "react";

export default function EditBookDialog({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = async (data: CreateBookInput) => {
    await updateBook(book.id, data);
    setOpen(false);
    router.refresh();
  };


  return (
    <Dialog key={book.id}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Edit Book</DialogTitle>
           <DialogDescription>
              Make changes to your book here
            </DialogDescription>
        </DialogHeader>

        <BookForm
          initialData={book}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
