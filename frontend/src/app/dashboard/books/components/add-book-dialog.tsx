"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createBookSchema,
  CreateBookInput,
} from "@/schemas/book.schema";
import { createBook } from "@/lib/book.api";
import { useState } from "react";

export default function AddBookDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateBookInput>({
    resolver: zodResolver(createBookSchema) as any,
    defaultValues: {
      title: "",
      author: "",
      description: "",
      price: 0,
      stock: 0,
      imageUrl: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: CreateBookInput) => {
    try {
      await createBook(data);
      reset();
      setOpen(false);
      // later: router.refresh()
    } catch (error) {
      console.error("Failed to create book", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg text-black">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <Input placeholder="Title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="Author" {...register("author")} />
          </div>

          <div>
            <Textarea
              placeholder="Description"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Price"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Stock"
                {...register("stock")}
              />
              {errors.stock && (
                <p className="text-sm text-red-500">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              placeholder="Image URL"
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 text-black">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
