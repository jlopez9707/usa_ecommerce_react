export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category?: string | null;
    categories?: Array<{
        id: number;
        name: string;
    }>;
    images?: Array<{
        id: number;
        url: string;
    }>;
}
