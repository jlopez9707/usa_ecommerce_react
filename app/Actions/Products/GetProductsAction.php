<?php

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class GetProductsAction
{
    /**
     * Get a paginated list of products.
     *
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function execute(array $filters = []): LengthAwarePaginator
    {
        $query = Product::query();

        // Apply filters
        if (isset($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (isset($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (isset($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        // Apply sorting
        $sortField = $filters['sort_field'] ?? 'created_at';
        $sortDirection = $filters['sort_direction'] ?? 'desc';

        $query->orderBy($sortField, $sortDirection);

        // Get paginated results
        $perPage = $filters['per_page'] ?? 12;

        return $query->paginate($perPage)
                    ->withQueryString();
    }
}
