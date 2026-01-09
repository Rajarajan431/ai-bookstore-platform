import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CartClient from "../CartClient";

const pushMock = vi.fn();
const dispatchMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
}));

vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (fn: any) =>
    fn({
      cart: {
        cart: {
          items: [
            {
              book: { id: 1, title: "Harry Potter" },
              quantity: 2,
            },
          ],
        },
        loading: false,
      },
    }),
}));

vi.mock("@/store/slices/cart.slice", () => ({
  fetchCart: () => ({ type: "fetchCart" }),
  clearCart: () => ({ type: "clearCart" }),
}));

vi.mock("@/store/slices/order.slice", () => ({
  placeOrder: () => ({
    unwrap: () => Promise.resolve(),
  }),
}));

describe("CartClient", () => {
  beforeEach(() => {
    dispatchMock.mockReturnValue({
      unwrap: () => Promise.resolve(),
    });
  });

  it("places order and redirects", async () => {
    render(<CartClient />);

    const checkoutBtn = screen.getByRole("button", {
      name: /checkout/i,
    });

    await fireEvent.click(checkoutBtn);

    expect(dispatchMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/dashboard/orders");
  });
});
