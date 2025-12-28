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
import { generateBookDescription } from "@/lib/ai.api";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AddBookDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const router = useRouter();

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
    getValues,
    setValue,
  } = form;

  // ✅ AI Description Generator
  const handleGenerateDescription = async () => {
    const { title, author } = getValues();

    if (!title || !author) {
      alert("Please enter title and author first");
      return;
    }

    try {
      setLoadingAI(true);
      const res = await generateBookDescription({ title, author });
      setValue("description", res.description);
    } catch {
      alert("Failed to generate description");
    } finally {
      setLoadingAI(false);
    }
  };

  const onSubmit = async (data: CreateBookInput) => {
    try {
      await createBook(data);
      reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create book", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-black">Add a New Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Title" {...register("title")} className="text-black" />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}

          <Input placeholder="Author" {...register("author")} className="text-black" />

          {/* ✅ AI Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateDescription}
            disabled={loadingAI}
            className="flex items-center gap-2 text-black"
          >
            <Sparkles className="w-4 h-4" />
            {loadingAI ? "Generating..." : "Generate Description with AI"}
          </Button>

          <Textarea
            placeholder="Description"
            {...register("description")}
            className="text-black"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Price"
              className="text-black"
              {...register("price")}
            />
            <Input
              type="number"
              placeholder="Stock"
              className="text-black"
              {...register("stock")}
            />
          </div>

          <Input placeholder="Image URL" {...register("imageUrl")}  className="text-black"/>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-black"
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
