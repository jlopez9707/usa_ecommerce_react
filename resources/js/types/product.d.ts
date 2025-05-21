export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    category?: string | null;
    categories?: Array<{
        id: number;
        name: string;
    }>;
}
