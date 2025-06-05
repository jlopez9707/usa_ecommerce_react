import { Product } from './product';

export interface Review {
    id: number;
    rating: number;
    status: string;
    product: Product;
}
