export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  status: string;
  book: {
    id: number;
    title: string;
  };
}

export interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export type OrderItemStatus =
  | "PENDING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"

export interface SellerOrderItem {
  id: number;
  quantity: number;
  price: number;
  status: OrderItemStatus;
  createdAt: string;

  book: {
    title: string;
  };

  order: {
    buyer: {
      name: string;
      email: string;
    };
  };
}
