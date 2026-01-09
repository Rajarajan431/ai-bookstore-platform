import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import BookCard from "../BookCard";

//Mock Next.js link
vi.mock("next/link", () => {
    return {
        default: ({ href, children }: any) => (
            <a href={href}>{children}</a>
        ),
    };
});

describe("BookCard Component", () => {
    const mockBook = {
        id: 1,
        title: "Harry Potter",
        price: 14.99,
        imageUrl: null,
    } as any;

    it("renders book title and price", () => {
        render(<BookCard book={mockBook} />);

        expect(screen.getByText("Harry Potter")).toBeInTheDocument();
        expect(screen.getByText("₹14.99")).toBeInTheDocument();
    });

    it("renders view Detials link with correct href", () => {
        render(<BookCard book={mockBook} />);

        const link = screen.getByRole("link", { name: /view details/i });
        expect(link).toHaveAttribute("href", "/books/1");
    })
})