<?php

namespace App\Actions\Categories;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetCategoriesAction
{
    /**
     * Get paginated and filtered categories.
     *
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function execute(array $filters = []): LengthAwarePaginator
    {
        $query = Category::query();

        // Apply search filter
        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // Apply sorting
        $sortField = $filters['sort_field'] ?? 'created_at';
        $sortDirection = $filters['sort_direction'] ?? 'desc';
        $query->orderBy($sortField, $sortDirection);

        // Apply pagination
        $perPage = $filters['per_page'] ?? 10;
        return $query->paginate($perPage)
            ->withQueryString();
    }
}
