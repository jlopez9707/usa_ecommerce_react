<?php

namespace App\Actions\Reviews;

use App\Models\Review;
use Illuminate\Pagination\LengthAwarePaginator;

class GetReviewsAction
{
    /**
     * Get a paginated list of reviews.
     *
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function execute(array $filters = []): LengthAwarePaginator
    {
        $query = Review::with(['user', 'product']);

        // Apply filters
        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('users.name', 'ilike', '%' . $filters['search'] . '%')
                  ->orWhere('products.name', 'ilike', '%' . $filters['search'] . '%');
            });
        }

        if (isset($filters['rating'])) {
            $query->where('rating', '=', $filters['rating']);
        }

        if (isset($filters['status'])) {
            $query->where('status', 'ilike', $filters['status']);
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
