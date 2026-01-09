import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookDetailsClient from "../book-details-client";

// ---------- MOCK ROUTER ----------
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// ---------- MOCK DISPATCH ----------
const dispatchMock = vi.fn();

vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => dispatchMock,
}));

// ---------- MOCK addToCart THUNK ----------
vi.mock("@/store/slices/cart.slice", () => ({
  addToCart: (id: number) => ({
    type: "cart/addToCart",
    payload: id,
    unwrap: () => Promise.resolve(),
  }),
}));

const mockBook = {
  id: 1,
  title: "Harry Potter",
  price: 14.99,
  description: "Magic book",
  imageUrl: null,
};

describe("Book Details - Add to Cart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adds book to cart and redirects to cart page", async () => {
    // mock dispatch to return object with unwrap
    dispatchMock.mockReturnValue({
      unwrap: () => Promise.resolve(),
    });

    render(<BookDetailsClient book={mockBook as any} />);

    const button = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/cart");
  });
});
