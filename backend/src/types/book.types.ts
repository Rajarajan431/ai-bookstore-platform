export interface CreateBookInput {
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
}

export interface UpdateBookInput {
    title?: string;
    description?: string;
    price?: number;
}