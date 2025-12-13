export interface CreateBookInput {
    title: string;
    description: string;
    price: number;
}

export interface UpdateBookInput {
    title?: string;
    description?: string;
    price?: number;
}