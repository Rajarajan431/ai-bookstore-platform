import { render, screen } from "@testing-library/react";
import BookGrid from "../BookGrid";

const mockBooks = [
    {
        id: 1,
        title: "Harry Potter",
        price: 14.99,
        imageUrl: null,
    },
    {
        id: 2,
        title: "The Hobbit",
        price: 19.99,
        imageUrl: null,
    }
];

describe("BookGrid", () => {
    it("renders a list of books", () => {
        render(<BookGrid books={mockBooks as any} />);

        //check book titles
        expect(screen.getByText("Harry Potter")).toBeInTheDocument();
        expect(screen.getByText("The Hobbit")).toBeInTheDocument();

        //check prices
        expect(screen.getByText("₹14.99")).toBeInTheDocument();
        expect(screen.getByText("₹14.99")).toBeInTheDocument();

    });
});