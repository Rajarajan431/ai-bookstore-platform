export interface Book {
  id: number;
  title: string;
  author?: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
}
