export interface CartBook {
  id: number;
  title: string;
  imageUrl: string | null;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  price: number; // snapshot price
  book: CartBook;
}

export interface Cart {
  id: number;
  total: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  items: CartItem[];
}
