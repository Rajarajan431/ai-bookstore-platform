"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/books?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/books");
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8 flex gap-3">
      <Input
        placeholder="Search by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-slate-900 text-white"
      />
    </form>
  );
}
