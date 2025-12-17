export interface CartBook {
id: number;
title: string;
price: number;
coverImage?: string;
}


export interface CartItem {
id: number;
bookId: number;
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


export interface CartState {
cart: Cart | null;
loading: boolean;
error?: string;
}