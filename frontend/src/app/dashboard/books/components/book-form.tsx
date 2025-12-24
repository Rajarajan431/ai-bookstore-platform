"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createBookSchema,
  CreateBookInput,
} from "@/schemas/book.schema";
import { useEffect } from "react";

interface BookFormProps {
  initialData?: Partial<CreateBookInput>;
  onSubmit: SubmitHandler<CreateBookInput>;
}

export default function BookForm({
  initialData,
  onSubmit,
}: BookFormProps) {
  const form = useForm<CreateBookInput>({
    resolver: zodResolver(createBookSchema) as any,
    defaultValues: {
      title: "",
      author: "",
      description: "",
      price: 0,
      stock: 0,
      imageUrl: "",
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-black"
    >
      <Input placeholder="Title" {...register("title")} />
      <Input placeholder="Author" {...register("author")} />
      <Textarea {...register("description")} />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          {...register("price", { valueAsNumber: true })}
        />
        <Input
          type="number"
          {...register("stock", { valueAsNumber: true })}
        />
      </div>

      <Input {...register("imageUrl")} />

      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
