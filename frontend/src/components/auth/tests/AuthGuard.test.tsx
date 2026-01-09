// tests/AuthGuard.test.tsx

import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthGuard } from "../auth-guard"; // adjust the path if needed

// ---------------- MOCK NEXT.JS ROUTER ----------------
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// ---------------- MOCK REDUX ----------------
const useAppSelectorMock = vi.fn();
vi.mock("@/store/hooks", () => ({
  useAppSelector: (fn: any) => useAppSelectorMock(fn),
}));

describe("AuthGuard Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    pushMock.mockClear();
    useAppSelectorMock.mockClear();
  });

  it("redirects unauthenticated users to /login", () => {
    // Mock user is NOT authenticated
    useAppSelectorMock.mockImplementation((fn: any) =>
      fn({ auth: { isAuthenticated: false } })
    );

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("renders children when authenticated", () => {
    // Mock user is authenticated
    useAppSelectorMock.mockImplementation((fn: any) =>
      fn({ auth: { isAuthenticated: true } })
    );

    const { getByText } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(getByText("Protected Content")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
